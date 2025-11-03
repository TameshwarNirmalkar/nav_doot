import type { AppState } from "@redux-store/store_config";
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from "@reduxjs/toolkit";
import { addBranchTypeAction, getbranchTypeListAction, updateBranchTypeAction } from "./action";

interface BranchTypeCollection {
  branchtype_id: number;
  branchtype_name: string;
}

interface BranchTypeStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const branchTypeEntityAdapter = createEntityAdapter<BranchTypeCollection, EntityId>({
  selectId: (branch: BranchTypeCollection) => branch.branchtype_id,
  sortComparer: (a: BranchTypeCollection, b: BranchTypeCollection) => a.branchtype_name.localeCompare(b.branchtype_name),
});

const branchTypeEntitySlice = createSlice({
  name: "BRANCH_TYPE_SLICE",
  initialState: branchTypeEntityAdapter.getInitialState<BranchTypeStateI>({
    isLoading: false,
    error: false,
    message: "",
  }),
  reducers: {
    addBranchType: branchTypeEntityAdapter.addOne,
    updadateBranchType: branchTypeEntityAdapter.updateOne,
    removeBranchType: branchTypeEntityAdapter.removeOne,
    updateOneBranchType: branchTypeEntityAdapter.setOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getbranchTypeListAction.pending, (state: BranchTypeStateI) => {
        state.isLoading = true;
      })
      .addCase(getbranchTypeListAction.fulfilled, (state: any, action: PayloadAction<BranchTypeCollection[]>) => {
        state.isLoading = false;
        branchTypeEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addBranchTypeAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addBranchTypeAction.fulfilled, (state: any, action: PayloadAction<BranchTypeCollection>) => {
        state.isLoading = false;
        branchTypeEntityAdapter.addOne(state, action.payload);
      })
      .addCase(updateBranchTypeAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateBranchTypeAction.fulfilled, (state: any, action: PayloadAction<BranchTypeCollection>) => {
        state.isLoading = false;
        branchTypeEntityAdapter.setOne(state, action.payload);
      });
  },
});

export const selectBranchTypeSliceState = (state: AppState) => state.branch_type;
export const { selectAll: selectBranchTypeList, selectById: selectBranchTypeById } = branchTypeEntityAdapter.getSelectors(selectBranchTypeSliceState);
export const { addBranchType, updadateBranchType, removeBranchType } = branchTypeEntitySlice.actions;
export default branchTypeEntitySlice.reducer;
