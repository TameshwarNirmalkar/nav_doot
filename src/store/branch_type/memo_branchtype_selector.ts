import { createSelector } from '@reduxjs/toolkit';
import { selectBranchTypeSliceState } from '.';

export const branchTypeIsLoading = createSelector([selectBranchTypeSliceState], (branchTypeState) => branchTypeState.isLoading);
