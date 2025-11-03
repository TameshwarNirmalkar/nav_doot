import type { AppState } from '@redux-store/store_config';
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from '@reduxjs/toolkit';
import { getAllCitiesBasedOnCountryAndStateAction, getAllCountriesWithFlagAction, getAllStatesBasedOnCountryAction } from './action';

interface CountryCitiesCollection {
  id: string;
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
  capital: string;
  native: string;
}

export interface StateListI {
  name: string;
  id: string;
}
export interface CityListI {
  name: string;
  id: string;
}

interface CountryCityStateI {
  isLoading: boolean;
  error: boolean;
  msg: string;
  stateList: StateListI[];
  cityList: CityListI[];
}

const countryCitiesEntityAdapter = createEntityAdapter<CountryCitiesCollection, EntityId>({
  selectId: (country: CountryCitiesCollection) => country.id,
  sortComparer: (a: CountryCitiesCollection, b: CountryCitiesCollection) => a.name.localeCompare(b.name),
});

const countryCityEntitySlice = createSlice({
  name: 'COUNTRY_CITIES_SLICE',
  initialState: countryCitiesEntityAdapter.getInitialState<CountryCityStateI>({
    isLoading: false,
    error: false,
    msg: '',
    stateList: [],
    cityList: [],
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCountriesWithFlagAction.pending, (state: CountryCityStateI) => {
        state.isLoading = true;
      })
      .addCase(getAllCountriesWithFlagAction.fulfilled, (state: any, action: PayloadAction<CountryCitiesCollection[]>) => {
        state.isLoading = false;
        countryCitiesEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllStatesBasedOnCountryAction.pending, (state: CountryCityStateI) => {
        state.isLoading = true;
      })
      .addCase(getAllStatesBasedOnCountryAction.fulfilled, (state: CountryCityStateI, action: PayloadAction<StateListI[]>) => {
        state.isLoading = false;
        state.stateList = action.payload;
      })
      .addCase(getAllCitiesBasedOnCountryAndStateAction.pending, (state: CountryCityStateI) => {
        state.isLoading = true;
      })
      .addCase(getAllCitiesBasedOnCountryAndStateAction.fulfilled, (state: CountryCityStateI, action: PayloadAction<CityListI[]>) => {
        state.isLoading = false;
        state.cityList = action.payload;
      });
  },
});

export const selectCountryCitySliceState = (state: AppState) => state.country_cities;

export const {
  selectAll: selectCountryCityList,
  selectById: selectCountryCityById,
  selectIds: selectCountryCityIds,
} = countryCitiesEntityAdapter.getSelectors(selectCountryCitySliceState);

export default countryCityEntitySlice.reducer;
