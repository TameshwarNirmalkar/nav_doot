import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store_config";
import { selectLocationById, selectLocationSliceState } from ".";

export const selectMemoizedIsLoading = createSelector([selectLocationSliceState], (locationState) => locationState.isLoading);
// export const selectMemoizedLocationById = createSelector([selectLocationById], (locationState: AppState) => locationState.location);
