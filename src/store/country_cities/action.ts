import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityListI, StateListI } from '.';
import countryData from '../../assets/data/country.json';
import stateData from '../../assets/data/state.json';
import cityData from '../../assets/data/city.json';

export const getAllCountriesWithFlagAction = createAsyncThunk('GET_ALL_COUNTERIES', async () => {
  try {
    // https://csc.sidsworld.co.in/api/countries
    // https://countriesnow.space/api/v0.1/countries/flag/images
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries?id=101`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    return [countryData.countries.find((el) => el.id === 101)];
  } catch (error: any) {
    return error;
  }
});

export const getAllStatesBasedOnCountryAction = createAsyncThunk<StateListI[], { country: string }>('GET_ALL_STATES', async (args: { country: string }) => {
  try {
    // https://csc.sidsworld.co.in/api/states/101
    // https://countriesnow.space/api/v0.1/countries/states --- POST
    // const res = await fetch(`https://csc.sidsworld.co.in/api/states/${args.country}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // body: JSON.stringify(args),
    // }).then((res) => res.json());
    return stateData.states;
  } catch (error: any) {
    return error;
  }
});

export const getAllCitiesBasedOnCountryAndStateAction = createAsyncThunk<CityListI[], { country: string; state: string }>(
  'GET_ALL_CITIES',
  async (args: { country: string; state: string }) => {
    try {
      // https://csc.sidsworld.co.in/api/cities/4040
      // https://countriesnow.space/api/v0.1/countries/state/cities --- POST
      // const res = await fetch(`https://csc.sidsworld.co.in/api/cities/${args.state}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // body: JSON.stringify(args),
      // }).then((res) => res.json());
      const keyToAccess = args.state as keyof typeof cityData;
      return cityData[keyToAccess].cities;
    } catch (error: any) {
      return error;
    }
  },
);
