import { createSelector } from "@reduxjs/toolkit";
import { selectZoneSliceState } from ".";

export const zoneIsLoading = createSelector([selectZoneSliceState], (zoneState) => zoneState.isLoading);
