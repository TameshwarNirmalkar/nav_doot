import type { AppState } from "@redux-store/store_config";
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from "@reduxjs/toolkit";
import { addZoneAction, getZoneListAction } from "./action";

interface ZoneCollection {
  zone_id: number;
  zone_name: string;
}

interface ZoneStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const zoneEntityAdapter = createEntityAdapter<ZoneCollection, EntityId>({
  selectId: (branch: ZoneCollection) => branch.zone_id,
  sortComparer: (a: ZoneCollection, b: ZoneCollection) => a.zone_name.localeCompare(b.zone_name),
});

const zoneEntitySlice = createSlice({
  name: "ZONE_SLICE",
  initialState: zoneEntityAdapter.getInitialState<ZoneStateI>({
    isLoading: false,
    error: false,
    message: "",
  }),
  reducers: {
    addZone: zoneEntityAdapter.addOne,
    updadateZone: zoneEntityAdapter.updateOne,
    removeZone: zoneEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneListAction.pending, (state: ZoneStateI) => {
        state.isLoading = true;
      })
      .addCase(getZoneListAction.fulfilled, (state: any, action: PayloadAction<ZoneCollection[]>) => {
        state.isLoading = false;
        zoneEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addZoneAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addZoneAction.fulfilled, (state: any, action: PayloadAction<ZoneCollection>) => {
        state.isLoading = false;
        zoneEntityAdapter.addOne(state, action.payload);
      });
  },
});

export const selectZoneSliceState = (state: AppState) => state.zone;
export const { selectAll: selectZoneList, selectById: selectZoneById } = zoneEntityAdapter.getSelectors(selectZoneSliceState);
export const { addZone, updadateZone, removeZone } = zoneEntitySlice.actions;
export default zoneEntitySlice.reducer;
