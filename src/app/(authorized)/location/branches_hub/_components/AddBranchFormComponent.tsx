'use client';

import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { selectBranchTypeList } from '@src/store/branch_type';
import { addBranchTypeAction } from '@src/store/branch_type/action';
import { branchTypeIsLoading } from '@src/store/branch_type/memo_branchtype_selector';
import { selectCountryCityList } from '@src/store/country_cities';
import { getAllCitiesBasedOnCountryAndStateAction, getAllStatesBasedOnCountryAction } from '@src/store/country_cities/action';
import { selectAllCities, selectAllState } from '@src/store/country_cities/memonised_country_city_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { Card, Col, Divider, Form, FormInstance, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { memo, useCallback } from 'react';

const AddBranchForm = () => {
  const addBranchForm = Form.useFormInstance();
  const dispatch = useAppDispatch();
  const allCountries = useAppSelector(selectCountryCityList);
  const allStates = useAppSelector(selectAllState);
  const allCities = useAppSelector(selectAllCities);
  const branchTypeList = useAppSelector(selectBranchTypeList);
  const isBranchLoading = useAppSelector(branchTypeIsLoading);

  const onCountrySelect = useCallback(
    (val: string, opt: any) => {
      addBranchForm.setFieldValue('country_name', opt.name);
      dispatch(getAllStatesBasedOnCountryAction({ country: val }));
    },
    [dispatch, addBranchForm],
  );

  const onStateSelect = useCallback(
    async (val: string, opt: any) => {
      const formVal = await addBranchForm.getFieldsValue(true);
      addBranchForm.setFieldValue('state_name', opt.name);
      dispatch(getAllCitiesBasedOnCountryAndStateAction({ country: formVal.state_code, state: val }));
    },
    [dispatch, addBranchForm],
  );

  const onCitySelect = useCallback(
    (val: string, opt: any) => {
      addBranchForm.setFieldValue('city_name', opt.name);
    },
    [addBranchForm],
  );

  const onBranchTypeSelect = useCallback(
    (opt: any) => {
      addBranchForm.setFieldValue('branchtype_name', opt.field_name);
    },
    [addBranchForm],
  );
  const _onParentBranchTypeSelect = useCallback(
    (opt: any) => {
      addBranchForm.setFieldValue('parent_branch_name', opt.field_name);
    },
    [addBranchForm],
  );
  const onAddBranch = useCallback(
    (txt: string) => {
      dispatch(addBranchTypeAction({ branchtype_name: txt, branchtype_id: branchTypeList.length }));
    },
    [dispatch, branchTypeList],
  );

  return (
    <>
      <Card title="Branch Details" style={{ marginBottom: 20 }}>
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
            <Form.Item name="branchtype_name" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item name="parent_branch_name" hidden>
              <Input hidden />
            </Form.Item>

            <Form.Item label="Branch Name" name="branch_name" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter Branch Name" tabIndex={1} />
            </Form.Item>

            <SelectWithAdd
              htmlProps={{ tabIndex: 3 }}
              dropDownList={branchTypeList.map((el) => ({ field_name: el.branchtype_name, field_id: el.branchtype_id }))}
              loadingState={isBranchLoading}
              field_id="branchtype_id"
              formItemLabel="Parent Branch"
              buttonLabel="Add"
              onAddHandler={onAddBranch}
              onItemSelectHandler={onBranchTypeSelect}
            />

            <Form.Item label="GST Number" name="gst_number" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter GST Number" tabIndex={5} />
            </Form.Item>
          </div>
          <div>
            <SelectWithAdd
              htmlProps={{ tabIndex: 2 }}
              dropDownList={branchTypeList.map((el) => ({ field_name: el.branchtype_name, field_id: el.branchtype_id }))}
              loadingState={isBranchLoading}
              field_id="branchtype_id"
              formItemLabel="Branch Type"
              buttonLabel="Add"
              onAddHandler={onAddBranch}
              onItemSelectHandler={onBranchTypeSelect}
            />

            <Form.Item label="Allow Scan" name="allow_scan" rules={[{ required: true, message: 'Required' }]}>
              <Select
                tabIndex={4}
                placeholder="Select Allow Scan"
                options={[
                  { label: 'Yes', value: 'Y' },
                  { label: 'No', value: 'N' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
      </Card>

      <Card title="Contact Details">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Item label="Contact Person" name="contact_person" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter Contact Person" tabIndex={6} />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter Phone Number" tabIndex={8} />
            </Form.Item>

            <Form.Item label="Postal Code" name="postal_code" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter postal code." tabIndex={10} />
            </Form.Item>

            <Form.Item label="State" name="state_code" rules={[{ required: true, message: 'Required' }]}>
              <Select tabIndex={12} showSearch placeholder="Select State" fieldNames={{ label: 'name', value: 'id' }} options={allStates} onSelect={onStateSelect} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Enter Email" tabIndex={7} />
            </Form.Item>
            <Form.Item label="Alternate Phone" name="alternate_phone">
              <Input placeholder="Enter Alternate Phone Number" tabIndex={9} />
            </Form.Item>
            <Form.Item label="City" name="city_code" rules={[{ required: true, message: 'Required' }]}>
              <Select tabIndex={11} showSearch placeholder="Select City" options={allCities} fieldNames={{ label: 'name', value: 'id' }} onSelect={onCitySelect} />
            </Form.Item>
            <Form.Item label="Country" name="country_code" rules={[{ required: true, message: 'Required' }]}>
              <Select tabIndex={13} showSearch placeholder="Select Country" fieldNames={{ label: 'name', value: 'id' }} options={allCountries} onSelect={onCountrySelect} />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Required' }]}>
          <TextArea rows={2} cols={2} placeholder="Enter Address" tabIndex={14} />
        </Form.Item>
      </Card>
    </>
  );
};

export default memo(AddBranchForm);
