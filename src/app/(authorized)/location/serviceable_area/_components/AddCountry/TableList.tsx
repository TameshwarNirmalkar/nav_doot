'use client';

import FilterColumnComponent from '@src/components/FilterColumnComponent/FilterColumnComponent';
import DropdownWithCheckboxes from '@src/components/FilterColumnComponent/FilterComponents';
import IconLoader from '@src/components/IconLoader/IconLoader';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import TableComponent from '@src/components/Tables/TableComponent';
import { getAllCitiesBasedOnCountryAndStateAction, getAllCountriesWithFlagAction, getAllStatesBasedOnCountryAction } from '@src/store/country_cities/action';
import { countryCityIsLoading } from '@src/store/country_cities/memonised_country_city_selector';
import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { addLocation, removeLocation, selectLocationList, updateLocation } from '@src/store/location';
import { addLocationAction, getAllLocationAction } from '@src/store/location/action';
import { getAllPinCode } from '@src/store/pin_code';
import { getListByPincodeAction } from '@src/store/pin_code/action';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { getZoneListAction } from '@src/store/zone/action';
import { getUniqueFilters } from '@src/utility/common_function';
import { delayWaitFor } from '@src/utility/delay';
import { Button, Card, Drawer, Dropdown, Flex, Form, Input, MenuProps, Popconfirm, Space, Switch } from 'antd';
// import Search from 'antd/es/input/Search';
import React, { memo, use, useCallback, useEffect, useMemo, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { LuSquarePlus } from 'react-icons/lu';
import { RiCloseLine, RiFilter3Fill } from 'react-icons/ri';
import { TbFilterPlus, TbTrash } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import AddCountry from './AddCountry';

const { Search } = Input;

const LocationTableList = () => {
  const [addCountryForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const pincodeList = useAppSelector(getAllPinCode);
  const allLocation = useAppSelector(selectLocationList);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, 'add_location_drawer'));
  const isLoading = useAppSelector(countryCityIsLoading);
  const [showAdd, setShowAddd] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const _id = Form.useWatch('id', addCountryForm);

  const filterFields = useMemo(() => {
    return {
      pinCode: getUniqueFilters(pincodeList, 'pincode'),
      countryName: getUniqueFilters(pincodeList, 'country'),
      stateName: getUniqueFilters(pincodeList, 'state'),
      cityName: getUniqueFilters(pincodeList, 'name'),
      zoneName: getUniqueFilters(pincodeList, 'region'),
    };
  }, [pincodeList]);

  // TableProps<ColumnType<ColumnProps<AnyObject>>>

  const columns: any[] = [
    {
      title: 'Pin Code',
      dataIndex: 'pincode',
      key: 'pincode',
      filters: filterFields.countryName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.pincode.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'City',
      dataIndex: 'name',
      key: 'name',
      filters: filterFields.cityName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      filters: filterFields.stateName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.state.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Region/Zone',
      dataIndex: 'region',
      key: 'region',
      filters: filterFields.zoneName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.region.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      filters: filterFields.countryName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.country.toLowerCase() === value;
      },
      filterMultiple: true,
    },

    // {
    //   title: 'Created Date',
    //   dataIndex: 'created_date',
    //   key: 'created_date',
    // },
    // {
    //   title: 'Modified Date',
    //   dataIndex: 'updated_date',
    //   key: 'updated_date',
    // },
    {
      title: 'Status',
      dataIndex: 'updated_date',
      key: 'updated_date',
      width: 100,
      filters: filterFields.countryName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.country.toLowerCase() === value;
      },
      filterMultiple: true,
      render: (text: string, row: any) => (
        <Flex>
          <Switch size="small" loading={false} defaultChecked={false} onChange={(checked) => onSwitchChange(checked, row)} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">Action</Flex>,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string, row: any) => (
        <Flex gap={10} justify="center" align="center">
          <FaEye size={20} color="gray" className="cursor-pointer" onClick={() => onEdit(row)} />
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveLocation(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
          {/* <Switch size="small" loading={false} defaultChecked={false} onChange={(checked) => onSwitchChange(checked, row)} /> */}
        </Flex>
      ),
    },
  ];

  const onSwitchChange = useCallback(
    (checked: boolean, values: any) => {
      if (checked) {
        dispatch(addLocationAction({ ...values, created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') }));
      }
    },
    [dispatch],
  );

  const filteredColumns = useMemo(() => {
    if (!selectedColumns.length) {
      return columns;
    } else {
      return columns.filter((el) => !selectedColumns.includes(el.dataIndex));
    }
  }, [selectedColumns, columns]);

  useEffect(() => {
    dispatch(getAllCountriesWithFlagAction());
    dispatch(getAllLocationAction());
    dispatch(getZoneListAction());
    dispatch(addDrawer({ drawerId: 'add_location_drawer', isCollapsed: false }));
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_location_drawer',
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_location_drawer',
        isCollapsed: false,
      }),
    );
    addCountryForm.resetFields();
  }, [dispatch, addCountryForm]);

  const onSave = useCallback(async () => {
    const values = await addCountryForm.getFieldsValue(true);
    if (values.id) {
      dispatch(updateLocation({ id: values.id, changes: { ...values, created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') } }));
    } else {
      dispatch(addLocation({ ...values, id: uuidv4(), created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') }));
    }
    onDrawerClose();
  }, [onDrawerClose, addCountryForm, dispatch]);

  const onEdit = useCallback(
    async (el: any) => {
      await dispatch(getAllStatesBasedOnCountryAction({ country: el.country_code }));
      await dispatch(getAllCitiesBasedOnCountryAndStateAction({ country: el.country_code, state: el.state_code }));
      addCountryForm.setFieldsValue(el);
      onOpenDrawer();
    },
    [addCountryForm, onOpenDrawer, dispatch],
  );

  const onRemoveLocation = useCallback(
    (val: any) => {
      dispatch(removeLocation(val.id));
    },
    [dispatch],
  );

  const onShowAdd = useCallback(
    (val: any) => {
      setShowAddd(true);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  return (
    <>
      <Card
        title={<SearchComponent searchLabel="Serviceable Area" onSearch={(val: string) => dispatch(getListByPincodeAction({ pin_code: val }))} />}
        extra={
          <Space>
            <IconLoader showLoader={isLoading} />
            {/* <Menu items={filterMenu} /> */}
            <DropdownWithCheckboxes
              tableColumns={columns}
              onFilterChangeValue={(val: string[]) => {
                setSelectedColumns(val);
              }}
            />
            {/* <Dropdown menu={{ items: filterMenu }} placement="bottomRight" onOpenChange={handleOpenChange} open={true}>
              <Button type="primary" icon={<TbFilterPlus />}>
                Add Filter
              </Button>
            </Dropdown> */}
            <Button type="primary" onClick={onShowAdd}>
              Add
            </Button>
          </Space>
        }>
        {/* {showAdd ? (
          <Form form={addCountryForm} layout="vertical">
          {/* <AddCountry formInst={addCountryForm} onCancelHandler={() => setShowAddd(false)} onSaveHandler={() => setShowAddd(false)} /> */}
        {/* ) : (
           </Form>
           */}
        <TableComponent rowKey={'id'} columns={filteredColumns} dataSource={allLocation} bordered pagination={false} />
      </Card>

      <Drawer
        width={500}
        title={
          <Flex justify="space-between">
            <span>Add Network</span>
            <RiCloseLine size={20} onClick={onDrawerClose} />
          </Flex>
        }
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose}>Close</Button>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Space>
          </Flex>
        }>
        <div>
          <Form form={addCountryForm} layout="vertical">
            <AddCountry formInst={addCountryForm} onCancelHandler={() => setShowAddd(false)} onSaveHandler={() => setShowAddd(false)} />
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default memo(LocationTableList);
