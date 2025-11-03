import type { AppState } from '@redux-store/store_config';
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from '@reduxjs/toolkit';
import { addVendorAction, getVendorAction, updateVendorAction } from './action';

export interface VendorsCollection {
  id: string;
  address: string;
  allow_scan: string;
  alternate_phone: number;
  vendor_name: string;
  // branch_name: string;
  // branch_type: number;
  city_code: number;
  city_name: string;
  contact_person: string;
  pan_number: string;
  email: string;
  gst_number: string;
  parent_branch_name: string;
  parent_branch_code: number;
  phone: number;
  postal_code: number;
  state_code: number;
  state_name: string;
  create_date: string;
  updated_date: string;
}

interface VendorsStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const VendorsEntityAdapter = createEntityAdapter<VendorsCollection, EntityId>({
  selectId: (branch: VendorsCollection) => branch.id,
  sortComparer: (a: VendorsCollection, b: VendorsCollection) => a.vendor_name.localeCompare(b.vendor_name),
});

const vendorsEntitySlice = createSlice({
  name: 'VENDORS_SLICE',
  initialState: VendorsEntityAdapter.getInitialState<VendorsStateI>({
    isLoading: false,
    error: false,
    message: '',
  }),
  reducers: {
    addVendors: VendorsEntityAdapter.addOne,
    updadateVendors: VendorsEntityAdapter.setOne,
    removeVendors: VendorsEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getVendorAction.pending, (state: VendorsStateI) => {
        state.isLoading = true;
      })
      .addCase(getVendorAction.fulfilled, (state: any, action: PayloadAction<VendorsCollection[]>) => {
        state.isLoading = false;
        VendorsEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addVendorAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addVendorAction.fulfilled, (state: any, action: PayloadAction<VendorsCollection>) => {
        state.isLoading = false;
        VendorsEntityAdapter.addOne(state, action.payload);
      })
      .addCase(updateVendorAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateVendorAction.fulfilled, (state: any, action: PayloadAction<VendorsCollection>) => {
        state.isLoading = false;
        VendorsEntityAdapter.setOne(state, action.payload);
      });
  },
});

export const selectVendorSliceState = (state: AppState) => state.vendors;
export const { selectAll: selectVendorList, selectById: selectVendorById } = VendorsEntityAdapter.getSelectors(selectVendorSliceState);
export const { addVendors, updadateVendors, removeVendors } = vendorsEntitySlice.actions;
export default vendorsEntitySlice.reducer;
