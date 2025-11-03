import type { AppState } from '@redux-store/store_config';
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from '@reduxjs/toolkit';
import { getBranchesAction } from './action';

interface BranchesCollection {
  id: string;
  address: string;
  allow_scan: string;
  alternate_phone: number;
  branch_name: string;
  branch_type: number;
  branchtype_name: string;
  parent_branch_name: string;
  city_code: number;
  city_name: string;
  contact_person: string;
  email: string;
  gst_number: string;
  parent_branch: number;
  phone: number;
  postal_code: number;
  state_code: number;
  state_name: string;
  create_date: string;
  updated_date: string;
}

interface BrancheStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const branchesEntityAdapter = createEntityAdapter<BranchesCollection, EntityId>({
  selectId: (branch: BranchesCollection) => branch.id,
  sortComparer: (a: BranchesCollection, b: BranchesCollection) => a.branch_name.localeCompare(b.branch_name),
});

const branchesEntitySlice = createSlice({
  name: 'BRANCHES_SLICE',
  initialState: branchesEntityAdapter.getInitialState<BrancheStateI>({
    isLoading: false,
    error: false,
    message: '',
  }),
  reducers: {
    addBranch: branchesEntityAdapter.addOne,
    updadateBranch: branchesEntityAdapter.updateOne,
    removeBranch: branchesEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getBranchesAction.pending, (state: BrancheStateI) => {
        state.isLoading = true;
      })
      .addCase(getBranchesAction.fulfilled, (state: any, action: PayloadAction<BranchesCollection[]>) => {
        state.isLoading = false;
        branchesEntityAdapter.upsertMany(state, action.payload);
      });
  },
});

export const selectBranchesSliceState = (state: AppState) => state.branches;
export const { selectAll: selectBranchesList, selectById: selectBranchesById, selectIds: selectBranchesIds } = branchesEntityAdapter.getSelectors(selectBranchesSliceState);
export const { addBranch, updadateBranch, removeBranch } = branchesEntitySlice.actions;
export default branchesEntitySlice.reducer;
