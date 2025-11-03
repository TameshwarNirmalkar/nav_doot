import { PayloadAction, createEntityAdapter, createSelector, createSlice, type EntityId } from '@reduxjs/toolkit';
import type { AppState } from '../store_config';
import { getMenuListAction } from './action';

export interface MenuListEntity {
  key: string;
  label: string;
}

export interface MenuStateI {
  isLoading: boolean;
  error: boolean;
  message: string | null;
}

const mainMenuEntityAdapter = createEntityAdapter<MenuListEntity, EntityId>({
  selectId: (drawer: MenuListEntity) => drawer.key,
});

const mainMenuEntitySlice = createSlice({
  name: 'MAIN_MENU_SLICE',
  initialState: mainMenuEntityAdapter.getInitialState<MenuStateI>({
    isLoading: false,
    error: false,
    message: '',
  }),
  reducers: {
    updateMainMenu: mainMenuEntityAdapter.updateOne,
    addMainMenu: mainMenuEntityAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getMenuListAction.pending, (state: MenuStateI) => {
        state.isLoading = true;
      })
      .addCase(getMenuListAction.fulfilled, (state: any, action: PayloadAction<MenuListEntity[]>) => {
        state.isLoading = false;
        mainMenuEntityAdapter.upsertMany(state, action.payload);
      });
  },
});

// Correct slice selector
export const selectMenuEntityState = (state: AppState) => state.main_menu;

// Regenerate selectors with the corrected slice selector
export const { selectAll: selectMenuList, selectById: selectMenuById } = mainMenuEntityAdapter.getSelectors(selectMenuEntityState);
export const { addMainMenu, updateMainMenu } = mainMenuEntitySlice.actions;
export default mainMenuEntitySlice.reducer;
