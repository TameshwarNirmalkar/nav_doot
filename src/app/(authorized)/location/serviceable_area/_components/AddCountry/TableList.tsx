"use client";
import { addDrawer, drawerUpdate } from "@src/store/drawer";
import { selectIsCollapsedById } from "@src/store/drawer/memoised_drawer_selector";
import { getAllLocationAction } from "@src/store/location/action";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { Button, Card, Drawer, Flex, Form, Popconfirm, Space } from "antd";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import AddCountry from "./AddCountry";
import { RiCloseLine } from "react-icons/ri";
import { addLocation, removeLocation, selectLocationList, updateLocation } from "@src/store/location";
import { AppState } from "@src/store/store_config";
import { getAllCitiesBasedOnCountryAndStateAction, getAllCountriesWithFlagAction, getAllStatesBasedOnCountryAction } from "@src/store/country_cities/action";
import { countryCityIsLoading } from "@src/store/country_cities/memonised_country_city_selector";
import { getZoneListAction } from "@src/store/zone/action";
import IconLoader from "@src/components/IconLoader/IconLoader";
import TableComponent from "@src/components/Tables/TableComponent";
import { getUniqueFilters } from "@src/utility/common_function";

const LocationTableList = () => {
  const [addCountryForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const locationList = useAppSelector(selectLocationList);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, "add_location_drawer"));
  const isLoading = useAppSelector(countryCityIsLoading);
  const [showAdd, setShowAddd] = useState<boolean>(false);

  const id = Form.useWatch("id", addCountryForm);

  const filterFields = useMemo(() => {
    return {
      countryName: getUniqueFilters(locationList, "country_name"),
      stateName: getUniqueFilters(locationList, "state_name"),
      cityName: getUniqueFilters(locationList, "city_name"),
      zoneName: getUniqueFilters(locationList, "zone_name"),
    };
  }, [locationList]);

  const columns: any[] = [
    {
      title: "Country",
      dataIndex: "country_name",
      key: "country_name",
      filters: filterFields.countryName,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.country_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "Region/Zone",
      dataIndex: "zone_name",
      key: "zone_name",
      filters: filterFields.zoneName,
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
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Modified Date",
      dataIndex: "updated_date",
      key: "updated_date",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: string, row: any) => (
        <Space>
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveLocation(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
  }, [dispatch]);

  const onSave = useCallback(async () => {
    const values = await addCountryForm.getFieldsValue(true);
    if (values.id) {
      dispatch(updateLocation({ id: values.id, changes: { ...values, created_date: new Date().toLocaleDateString("en-GB"), updated_date: new Date().toLocaleDateString("en-GB") } }));
    } else {
      dispatch(addLocation({ ...values, id: uuidv4(), created_date: new Date().toLocaleDateString("en-GB"), updated_date: new Date().toLocaleDateString("en-GB") }));
    }
    onDrawerClose();
  }, []);

  const onEdit = useCallback(async (el: any) => {
    await dispatch(getAllStatesBasedOnCountryAction({ country: el.country_code }));
    await dispatch(getAllCitiesBasedOnCountryAndStateAction({ country: el.country_code, state: el.state_code }));
    addCountryForm.setFieldsValue(el);
    onOpenDrawer();
  }, []);

  const onRemoveLocation = useCallback((val: any) => {
    dispatch(removeLocation(val.id));
  }, []);

  const onShowAdd = useCallback((val: any) => {
    // setShowAddd(true);
    onOpenDrawer();
  }, []);

  return (
    <>
      <Card
        title={<>Serviceable Area</>}
        extra={
          <Space>
            <IconLoader showLoader={isLoading} />
            <Button type="primary" onClick={onShowAdd} disabled={showAdd}>
              Add Location
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
        <TableComponent rowKey={"id"} columns={columns} dataSource={locationList} bordered />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? "Edit Location" : "Add Location"}</span>
            <RiCloseLine size={20} onClick={onDrawerClose} />
          </Flex>
        }
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose}>Cancel</Button>
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
        </div>
      </Drawer>
    </>
  );
};

export default memo(LocationTableList);
