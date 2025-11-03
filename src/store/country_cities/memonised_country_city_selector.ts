import { createSelector } from "@reduxjs/toolkit";
import { selectCountryCityList, selectCountryCitySliceState } from ".";

export const countryCityIsLoading = createSelector([selectCountryCitySliceState], (countryState) => countryState.isLoading);
// export const selectAllCountryCityEntitiesMemoized = createSelector([selectCountryCityList], (countryCityList) => countryCityList);
export const selectAllState = createSelector([selectCountryCitySliceState], (countryData) => countryData.stateList);
export const selectAllCities = createSelector([selectCountryCitySliceState], (stateData) => stateData.cityList);
