"use client";

import FilterColumnComponent from "@src/components/FilterColumnComponent/FilterColumnComponent";
import DropdownWithCheckboxes from "@src/components/FilterColumnComponent/FilterComponents";
import IconLoader from "@src/components/IconLoader/IconLoader";
import TableComponent from "@src/components/Tables/TableComponent";
import TableFilterableColumn from "@src/components/Tables/TableFilterIcons";
import { getAllCitiesBasedOnCountryAndStateAction, getAllCountriesWithFlagAction, getAllStatesBasedOnCountryAction } from "@src/store/country_cities/action";
import { countryCityIsLoading } from "@src/store/country_cities/memonised_country_city_selector";
import { addDrawer, drawerUpdate } from "@src/store/drawer";
import { selectIsCollapsedById } from "@src/store/drawer/memoised_drawer_selector";
import { addLocation, removeLocation, selectLocationList, updateLocation } from "@src/store/location";
import { getAllLocationAction } from "@src/store/location/action";
import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { AppState } from "@src/store/store_config";
import { getZoneListAction } from "@src/store/zone/action";
import { getUniqueFilters } from "@src/utility/common_function";
import { Button, Card, Checkbox, Drawer, Dropdown, Flex, Form, Input, Menu, MenuProps, Popconfirm, Space, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnProps, ColumnsType, ColumnType } from "antd/es/table";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { LuSquarePlus } from "react-icons/lu";
import { RiCloseLine, RiFilter3Fill } from "react-icons/ri";
import { TbFilterPlus, TbTrash } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import AddCountry from "./AddCountry";

type MenuItem = Required<MenuProps>["items"][number];

const LocationTableList = () => {
  const [addCountryForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const locationList = useAppSelector(selectLocationList);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, "add_location_drawer"));
  const isLoading = useAppSelector(countryCityIsLoading);
  const [showAdd, setShowAddd] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const _id = Form.useWatch("id", addCountryForm);

  const filterFields = useMemo(() => {
    return {
      countryName: getUniqueFilters(locationList, "country_name"),
      stateName: getUniqueFilters(locationList, "state_name"),
      cityName: getUniqueFilters(locationList, "city_name"),
      zoneName: getUniqueFilters(locationList, "zone_name"),
    };
  }, [locationList]);

  // TableProps<ColumnType<ColumnProps<AnyObject>>>

  const columns: any[] = [
    {
      title: "Country",
      dataIndex: "country_name",
      key: "country_name",
      filters: filterFields.countryName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.country_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "Region/Zone",
      dataIndex: "zone_name",
      key: "zone_name",
      filters: filterFields.zoneName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.zone_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "State",
      dataIndex: "state_name",
      key: "state_name",
      filters: filterFields.stateName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.state_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "City",
      dataIndex: "city_name",
      key: "city_name",
      filters: filterFields.cityName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.city_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "Postal Code",
      dataIndex: "postal_code",
      key: "postal_code",
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: string, row: any) => (
        <Flex gap={10} justify="center" align="center">
          <FaEye size={20} color="gray" className="cursor-pointer" onClick={() => onEdit(row)} />
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveLocation(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

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
    dispatch(addDrawer({ drawerId: "add_location_drawer", isCollapsed: false }));
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_location_drawer",
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_location_drawer",
        isCollapsed: false,
      }),
    );
    addCountryForm.resetFields();
  }, [dispatch, addCountryForm]);

  const onSave = useCallback(async () => {
    const values = await addCountryForm.getFieldsValue(true);
    if (values.id) {
      dispatch(updateLocation({ id: values.id, changes: { ...values, created_date: new Date().toLocaleDateString("en-GB"), updated_date: new Date().toLocaleDateString("en-GB") } }));
    } else {
      dispatch(addLocation({ ...values, id: uuidv4(), created_date: new Date().toLocaleDateString("en-GB"), updated_date: new Date().toLocaleDateString("en-GB") }));
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
      // setShowAddd(true);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  return (
    <>
      <Card
        title={
          <Space size={"large"}>
            <div>Serviceable Area</div>
            <Input placeholder="Location Search" style={{ width: 340 }} />
          </Space>
        }
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
            <Button type="primary" onClick={onShowAdd} disabled={showAdd} icon={<LuSquarePlus size={15} />}>
              Add
            </Button>
          </Space>
        }
      >
        {/* {showAdd ? (
          <Form form={addCountryForm} layout="vertical">
          {/* <AddCountry formInst={addCountryForm} onCancelHandler={() => setShowAddd(false)} onSaveHandler={() => setShowAddd(false)} /> */}
        {/* ) : (
           </Form>
           */}
        <TableComponent rowKey={"id"} columns={filteredColumns} dataSource={locationList} bordered />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>Add Location</span>
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
        }
      >
        <div>
          <Form form={addCountryForm} layout="vertical">
            <AddCountry formInst={addCountryForm} onCancelHandler={() => setShowAddd(false)} onSaveHandler={() => setShowAddd(false)} />
          </Form>

          {/* <>Created By</>
          <>Created Date</>
          <>Updated By</>
          <>Updated Date</> */}
        </div>
      </Drawer>
    </>
  );
};

export default memo(LocationTableList);
