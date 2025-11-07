'use client';
import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { selectCountryCityList } from '@src/store/country_cities';
import { getAllCitiesBasedOnCountryAndStateAction, getAllCountriesWithFlagAction, getAllStatesBasedOnCountryAction } from '@src/store/country_cities/action';
import { selectAllCities, selectAllState } from '@src/store/country_cities/memonised_country_city_selector';
import { addLocation, updateLocation } from '@src/store/location';
import { getListByPincodeAction } from '@src/store/pin_code/action';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { isLoading } from '@src/store/users/memonised-user';
import { addZone, selectZoneList } from '@src/store/zone';
import { addZoneAction } from '@src/store/zone/action';
import { delayWaitFor } from '@src/utility/delay';
import { App, Button, Col, Flex, Form, FormInstance, Input, Popover, Row, Select, Space, Tag } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { HiPlusCircle } from 'react-icons/hi';
import { PiPlus, PiPlusCircle } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';

const AddCountry = ({ formInst, onCancelHandler, onSaveHandler }: { formInst?: FormInstance; onCancelHandler: () => void; onSaveHandler: () => void }) => {
  const addCountryForm = Form.useFormInstance();
  const dispatch = useAppDispatch();
  const allCountries = useAppSelector(selectCountryCityList);
  const allStates = useAppSelector(selectAllState);
  const allCities = useAppSelector(selectAllCities);
  const allZones = useAppSelector(selectZoneList);

  // const { message } = App.useApp();

  // const [zone_name, setZoneName] = useState<string>('');
  // const [popupOpen, setPopupOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   dispatch(getAllCountriesWithFlagAction());
  //   dispatch(getAllStatesBasedOnCountryAction({ country: 'India' }));
  // }, [dispatch]);

  const onCountrySelect = useCallback(
    (val: string, opt: any) => {
      addCountryForm.setFieldValue('country_name', opt.name);
      dispatch(getAllStatesBasedOnCountryAction({ country: val }));
    },
    [dispatch, addCountryForm.setFieldValue],
  );

  const onStateSelect = useCallback(
    async (val: string, opt: any) => {
      const formVal = await addCountryForm.getFieldsValue(true);
      addCountryForm.setFieldValue('state_name', opt.name);
      dispatch(getAllCitiesBasedOnCountryAndStateAction({ country: formVal.country, state: val }));
    },
    [dispatch, addCountryForm.getFieldsValue, addCountryForm.setFieldValue],
  );

  const onCitySelect = useCallback(
    async (val: string, opt: any) => {
      addCountryForm.setFieldValue('city_name', opt.name);
    },
    [addCountryForm.setFieldValue],
  );

  const onZoneSelect = useCallback(
    async (val: string, opt: any) => {
      addCountryForm.setFieldValue('zone_name', opt.zone_name);
    },
    [addCountryForm.setFieldValue],
  );

  // const addNewZone = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   if (!zone_name) {
  //     message.error('Field should not be empty');
  //   } else {
  //     dispatch(
  //       addZoneAction({
  //         zone_name: zone_name
  //           .split(' ')
  //           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //           .join(' '),
  //         zone_id: allZones.length + 1,
  //       }),
  //     );
  //     setPopupOpen(false);
  //     setZoneName('');
  //   }
  // };

  // const onFormFinish = useCallback((values: any) => {
  //   // dispatch(addLocation({ ...values, id: uuidv4(), created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') }));
  //   if (values.id) {
  //     dispatch(
  //       updateLocation({ id: values.id, changes: { ...values, created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') } }),
  //     );
  //   } else {
  //     dispatch(addLocation({ ...values, id: uuidv4(), created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') }));
  //   }
  //   onSaveHandler();
  // }, []);

  // const onCancel = useCallback(() => {
  //   onCancelHandler();
  // }, []);

  return (
    <div>
      {/* <Form form={addCountryForm} layout="vertical" onFinish={onFormFinish} style={{ width: '100%' }}> */}
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="country_name" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="state_name" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="city_name" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="zone_name" hidden>
        <Input hidden />
      </Form.Item>
      {/* <Row gutter={24} style={{ width: '100%' }}>
        <Col span={12}> */}
      <Form.Item label="Postal Code/Zip Code" name="postal_code" rules={[{ required: true, message: 'Required' }]}>
        <Input
          placeholder="Enter postal code."
          onChange={(e) => {
            delayWaitFor(800);
            dispatch(getListByPincodeAction({ pin_code: e.target.value }));
          }}
        />
      </Form.Item>

      <Form.Item label="City" name="city_code" rules={[{ required: true, message: 'Required' }]}>
        <Select showSearch placeholder="Select City" optionFilterProp="name" filterSort={(optionA, optionB) => (optionA.name ?? '').toLowerCase().localeCompare((optionB.name ?? '').toLowerCase())} fieldNames={{ label: 'name', value: 'id' }} options={allCities} onSelect={onCitySelect} />
      </Form.Item>
      <Form.Item label="State" name="state_code" rules={[{ required: true, message: 'Required' }]}>
        <Select showSearch placeholder="Select State" optionFilterProp="name" filterSort={(optionA, optionB) => (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())} fieldNames={{ label: 'name', value: 'id' }} options={allStates} onSelect={onStateSelect} />
      </Form.Item>
      {/* <Form.Item
        label={
          <Space>
            <span>Zone</span>
          </Space>
        }
        name="zone_id"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select placeholder="Select Zone/Region" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.zone_name ?? '').toLowerCase().localeCompare((optionB?.zone_name ?? '').toLowerCase())} fieldNames={{ label: 'zone_name', value: 'zone_id' }} options={allZones} onSelect={onZoneSelect} />
      </Form.Item> */}
      <SelectWithAdd formPlaceholder="Select Zone/Region" loadingState={true} dropDownList={allZones.map((el) => ({ field_name: el.zone_name, field_id: el.zone_id }))} field_id="zone_id" formItemLabel="Zone/Region" buttonLabel="Add" onAddHandler={() => 'addZone'} onItemSelectHandler={() => onZoneSelect} />
      <Form.Item label="Country" name="country_code" rules={[{ required: true, message: 'Required' }]}>
        <Select showSearch placeholder="Select Country" optionFilterProp="name" filterSort={(optionA, optionB) => (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())} fieldNames={{ label: 'name', value: 'id' }} options={allCountries} onSelect={onCountrySelect} />
      </Form.Item>
      {/* </Col>
        <Col span={12}> */}

      {/* </Col>
      </Row> */}
      {/* <Flex justify="end">
        <Form.Item>
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Flex> */}
      {/* </Form> */}
    </div>
  );
};

export default memo(AddCountry);
