import { createEntityAdapter, createSlice, type EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../store_config';
import { getListByPincodeAction } from './action';

export interface PincodeEntity {
  pin_code: EntityId;
  description: string;
  branch_type: string;
  circle: string;
  district: string;
  division: string;
  region: string;
  city_name: string;
  state_name: string;
  country_name: string;
}

export interface PincodeStateI {
  isLoading: boolean;
  msg: string | null;
  error: boolean;
}

const PincodeEntityAdapter = createEntityAdapter<PincodeEntity, EntityId>({
  selectId: (drawer: PincodeEntity) => drawer.pin_code,
});

const PincodeEntitySlice = createSlice({
  name: 'PINCODE_SLICE',
  initialState: PincodeEntityAdapter.getInitialState<PincodeStateI>({
    isLoading: false,
    error: false,
    msg: null,
  }),
  reducers: {
    // drawerUpdate: PincodeEntityAdapter.setOne,
    // addDrawer: PincodeEntityAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getListByPincodeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListByPincodeAction.fulfilled, (state: any, action: PayloadAction<PincodeEntity[]>) => {
        state.isLoading = true;
        PincodeEntityAdapter.upsertMany(state, action.payload);
      });
  },
});

// Correct slice selector
export const selectPincodeEntitySliceState = (state: AppState) => state.pin_code;

// Regenerate selectors with the corrected slice selector
export const { selectById } = PincodeEntityAdapter.getSelectors(selectPincodeEntitySliceState);
// export const { drawerUpdate, addDrawer } = PincodeEntitySlice.actions;
export default PincodeEntitySlice.reducer;
