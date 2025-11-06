import type { AppState } from "@redux-store/store_config";
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from "@reduxjs/toolkit";
import { getCustomersAction } from "./action";

interface CustomersCollection {
  id: string;
  address: string;
  allow_scan: string;
  alternate_phone: number;
  customer_name: string;
  // branch_name: string;
  // branch_type: number;
  city_code: number;
  city_name: string;
  contact_person: string;
  email: string;
  gst_number: string;
  parent_branch_name: string;
  parent_branch_code: number;
  phone: number;
  postal_code: number;
  state_code: number;
  state_name: string;
  created_date: string;
  updated_date: string;
}

interface CustomersStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const customersEntityAdapter = createEntityAdapter<CustomersCollection, EntityId>({
  selectId: (branch: CustomersCollection) => branch.id,
  sortComparer: (a: CustomersCollection, b: CustomersCollection) => a.customer_name.localeCompare(b.customer_name),
});

const customesEntitySlice = createSlice({
  name: "CUSTOMERS_SLICE",
  initialState: customersEntityAdapter.getInitialState<CustomersStateI>({
    isLoading: false,
    error: false,
    message: "",
  }),
  reducers: {
    addCustomer: customersEntityAdapter.addOne,
    updadateCustomer: customersEntityAdapter.updateOne,
    removeCustomer: customersEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getCustomersAction.pending, (state: CustomersStateI) => {
        state.isLoading = true;
      })
      .addCase(getCustomersAction.fulfilled, (state: any, action: PayloadAction<CustomersCollection[]>) => {
        state.isLoading = false;
        customersEntityAdapter.upsertMany(state, action.payload);
      });
  },
});

export const selectCustomerSliceState = (state: AppState) => state.customers;
export const { selectAll: selectCustomerList, selectById: selectCustomerById } = customersEntityAdapter.getSelectors(selectCustomerSliceState);
export const { addCustomer, updadateCustomer, removeCustomer } = customesEntitySlice.actions;
export default customesEntitySlice.reducer;
