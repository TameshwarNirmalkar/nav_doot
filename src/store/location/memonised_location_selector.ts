import { createSelector } from "@reduxjs/toolkit";
import { selectLocationSliceState, selectLocationById } from ".";
import { AppState } from "../store_config";

// export const selectMemoizedIsLoading = createSelector([selectLocationSliceState], (countryState) => countryState.isLoading);
export const selectMemoizedLocationById = createSelector([selectLocationById], (locationState: AppState) => locationState.id);
