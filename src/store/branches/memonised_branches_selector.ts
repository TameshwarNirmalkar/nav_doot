import { createSelector } from '@reduxjs/toolkit';
import { selectBranchesSliceState } from '.';

export const branchesIsLoading = createSelector([selectBranchesSliceState], (countryState) => countryState.isLoading);
