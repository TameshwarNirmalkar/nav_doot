import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store_config";
import { selectLocationById, selectLocationSliceState } from ".";

// export const selectMemoizedIsLoading = createSelector([selectLocationSliceState], (countryState) => countryState.isLoading);
export const selectMemoizedLocationById = createSelector([selectLocationById], (locationState: AppState) => locationState.id);
