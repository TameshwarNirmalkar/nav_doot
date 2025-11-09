import type { AppState } from '@redux-store/store_config';
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from '@reduxjs/toolkit';
import { addLocationAction, getAllLocationAction } from './action';

export interface LocationCollectionI {
  id: string;
  country: string;
  region: string;
  state: string;
  city: string;
  pincode: number;
  district: string;
  division: string;
  branch_type: string;
  block: string;
  name: string;
}

interface LocationStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const locationEntityAdapter = createEntityAdapter<LocationCollectionI, EntityId>({
  selectId: (country: LocationCollectionI) => country.id,
  sortComparer: (a: LocationCollectionI, b: LocationCollectionI) => a.name.localeCompare(b.name),
});

const locationEntitySlice = createSlice({
  name: 'LOCATION_SLICE',
  initialState: locationEntityAdapter.getInitialState<LocationStateI>({
    isLoading: false,
    error: false,
    message: '',
  }),
  reducers: {
    addLocation: locationEntityAdapter.addOne,
    updateLocation: locationEntityAdapter.updateOne,
    removeLocation: locationEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getAllLocationAction.pending, (state: LocationStateI) => {
        state.isLoading = true;
      })
      .addCase(getAllLocationAction.fulfilled, (state: any, action: PayloadAction<LocationCollectionI[]>) => {
        state.isLoading = false;
        locationEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addLocationAction.pending, (state: LocationStateI) => {
        state.isLoading = true;
      })
      .addCase(addLocationAction.fulfilled, (state: any, action: PayloadAction<LocationCollectionI>) => {
        state.isLoading = false;
        locationEntityAdapter.addOne(state, action.payload);
      });
  },
});

export const selectLocationSliceState = (state: AppState) => state.location;
export const { selectAll: selectLocationList, selectById: selectLocationById, selectIds: selectLocationIds } = locationEntityAdapter.getSelectors(selectLocationSliceState);
export const { addLocation, updateLocation, removeLocation } = locationEntitySlice.actions;
export default locationEntitySlice.reducer;
