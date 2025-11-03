import { createSelector } from '@reduxjs/toolkit';
import { selectVendorSliceState } from '.';

export const vendorIsLoading = createSelector([selectVendorSliceState], (vendorState) => vendorState.isLoading);
