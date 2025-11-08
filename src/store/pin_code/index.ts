import { createEntityAdapter, createSlice, type EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { toSnakeCaseKeysInArray } from '@src/utility/common_function';
import type { AppState } from '../store_config';
import { getListByPincodeAction } from './action';

export interface PincodeEntity {
  id: EntityId;
  pincode: number;
  description: string;
  branch_type: string;
  circle: string;
  district: string;
  division: string;
  region: string;
  block: string;
  state: string;
  country: string;
  name: string;
}

export interface PincodeStateI {
  isLoading: boolean;
  msg: string | null;
  error: boolean;
}

const PincodeEntityAdapter = createEntityAdapter<PincodeEntity, EntityId>({
  selectId: (drawer: PincodeEntity) => drawer.id,
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
      .addCase(getListByPincodeAction.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
        PincodeEntityAdapter.upsertMany(state, action.payload);
      });
  },
});

// Correct slice selector
export const selectPincodeEntitySliceState = (state: AppState) => state.pin_code;

// Regenerate selectors with the corrected slice selector
export const { selectById, selectAll: getAllPinCode } = PincodeEntityAdapter.getSelectors(selectPincodeEntitySliceState);
// export const { drawerUpdate, addDrawer } = PincodeEntitySlice.actions;
export default PincodeEntitySlice.reducer;
