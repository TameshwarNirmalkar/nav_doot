import { createEntityAdapter, createSelector, createSlice, type EntityId } from "@reduxjs/toolkit";
import type { AppState } from "../store_config";
import { getDrawerListAction } from "./action";

export interface DrawerListEntity {
  drawerId: string;
  isCollapsed: boolean;
}

export interface DrawerStateI {
  isLoading: boolean;
  errorMsg: string | null;
}

const drawerAdapter = createEntityAdapter<DrawerListEntity, EntityId>({
  selectId: (drawer: DrawerListEntity) => drawer.drawerId,
});

const drawerSlice = createSlice({
  name: "DRAWER_SLICE",
  initialState: drawerAdapter.getInitialState<DrawerStateI>({
    isLoading: false,
    errorMsg: "",
  }),
  reducers: {
    drawerUpdate: drawerAdapter.setOne,
    addDrawer: drawerAdapter.addOne,
  },
});

// Correct slice selector
export const selectDrawerSliceState = (state: AppState) => state.drawer;

// Regenerate selectors with the corrected slice selector
export const { selectById: selectDrawerById } = drawerAdapter.getSelectors(selectDrawerSliceState);
export const { drawerUpdate, addDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
