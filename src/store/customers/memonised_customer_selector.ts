import { createSelector } from "@reduxjs/toolkit";
import { selectCustomerSliceState } from ".";

export const customerIsLoading = createSelector([selectCustomerSliceState], (countryState) => countryState.isLoading);
