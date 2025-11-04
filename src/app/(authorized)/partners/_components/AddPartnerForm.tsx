'use client';

import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { selectBranchTypeList } from '@src/store/branch_type';
import { addBranchTypeAction } from '@src/store/branch_type/action';
import { branchTypeIsLoading } from '@src/store/branch_type/memo_branchtype_selector';
import { selectCountryCityList } from '@src/store/country_cities';
import { getAllCitiesBasedOnCountryAndStateAction, getAllStatesBasedOnCountryAction } from '@src/store/country_cities/action';
import { selectAllCities, selectAllState } from '@src/store/country_cities/memonised_country_city_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { Form, FormInstance, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { memo, useCallback } from 'react';

const AddCustomerForm = () => {
  const addCustomerForm = Form.useFormInstance();
  const dispatch = useAppDispatch();
  const branchTypeList = useAppSelector(selectBranchTypeList);
  const isBranchLoading = useAppSelector(branchTypeIsLoading);
  const allStates = useAppSelector(selectAllState);
  const allCities = useAppSelector(selectAllCities);
  const allCountries = useAppSelector(selectCountryCityList);

  const onStateSelect = useCallback(
    async (val: string, opt: any) => {
      const formVal = await addCustomerForm.getFieldsValue(true);
      addCustomerForm.setFieldValue('state_name', opt.name);
      dispatch(getAllCitiesBasedOnCountryAndStateAction({ country: formVal.state_code, state: val }));
    },
    [dispatch, addCustomerForm],
  );

  const onCitySelect = useCallback(
    (val: string, opt: any) => {
      addCustomerForm.setFieldValue('city_name', opt.name);
    },
    [addCustomerForm],
  );

  const onCountrySelect = useCallback(
    (val: string, opt: any) => {
      addCustomerForm.setFieldValue('country_name', opt.name);
      dispatch(getAllStatesBasedOnCountryAction({ country: val }));
    },
    [dispatch, addCustomerForm],
  );

  const onBranchTypeSelect = useCallback(
    (opt: any) => {
      addCustomerForm.setFieldValue('branchtype_name', opt.field_name);
    },
    [addCustomerForm],
  );
  const onParentBranchTypeSelect = useCallback(
    (opt: any) => {
      addCustomerForm.setFieldValue('parent_branch_name', opt.field_name);
    },
    [addCustomerForm],
  );

  const onAddBranch = useCallback(
    (txt: string) => {
      dispatch(addBranchTypeAction({ branchtype_name: txt, branchtype_id: branchTypeList.length }));
    },
    [dispatch, branchTypeList],
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Form.Item name="id" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name="state_name" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name="city_name" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name="branch_type" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name="parent_branch_name" hidden>
          <Input hidden />
        </Form.Item>

        <Form.Item label="Full Name" name="customer_name" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter Name" />
        </Form.Item>

        <Form.Item label="Pan Number" name="pan_number" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter Pan Number" />
        </Form.Item>

        <SelectWithAdd dropDownList={branchTypeList.map((el) => ({ field_name: el.branchtype_name, field_id: el.branchtype_id }))} loadingState={isBranchLoading} field_id="branchtype_id" formItemLabel="Branch Type" buttonLabel="Add" onAddHandler={onAddBranch} onItemSelectHandler={onBranchTypeSelect} />

        <SelectWithAdd dropDownList={branchTypeList.map((el) => ({ field_name: el.branchtype_name, field_id: el.branchtype_id }))} loadingState={isBranchLoading} field_id="parent_branch_code" formItemLabel="Parent Branch" buttonLabel="Add" onAddHandler={onAddBranch} onItemSelectHandler={onParentBranchTypeSelect} />
        <Form.Item label="GST Number" name="gst_number" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter GST Number" />
        </Form.Item>
        <Form.Item label="Contact Person" name="contact_person" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter Contact Person" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter Email" />
        </Form.Item>
      </div>
      <div>
        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter Phone Number" />
        </Form.Item>
        <Form.Item label="Alternate Phone" name="alternate_phone">
          <Input placeholder="Enter Alternate Phone Number" />
        </Form.Item>
        <Form.Item label="Allow Scan" name="allow_scan" rules={[{ required: true, message: 'Required' }]}>
          <Select
            placeholder="Select Allow Scan"
            options={[
              { label: 'Yes', value: 'Y' },
              { label: 'No', value: 'N' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Postal Code" name="postal_code" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="Enter postal code." />
        </Form.Item>
        <Form.Item label="City" name="city_code" rules={[{ required: true, message: 'Required' }]}>
          <Select showSearch placeholder="Select City" filterSort={(optionA, optionB) => (optionA.name ?? '').toLowerCase().localeCompare((optionB.name ?? '').toLowerCase())} options={allCities} optionFilterProp="name" fieldNames={{ label: 'name', value: 'id' }} onSelect={onCitySelect} />
        </Form.Item>

        <Form.Item label="State" name="state_code" rules={[{ required: true, message: 'Required' }]}>
          <Select showSearch placeholder="Select State" filterSort={(optionA, optionB) => (optionA.name ?? '').toLowerCase().localeCompare((optionB.name ?? '').toLowerCase())} fieldNames={{ label: 'name', value: 'id' }} optionFilterProp="name" options={allStates} onSelect={onStateSelect} />
        </Form.Item>

        <Form.Item label="Country" name="country_code" rules={[{ required: true, message: 'Required' }]}>
          <Select showSearch placeholder="Select Country" optionFilterProp="name" filterSort={(optionA, optionB) => (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())} fieldNames={{ label: 'name', value: 'id' }} options={allCountries} onSelect={onCountrySelect} />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Required' }]}>
          <TextArea rows={5} cols={6} placeholder="Enter Address" />
        </Form.Item>
      </div>
    </div>
  );
};

export default memo(AddCustomerForm);
