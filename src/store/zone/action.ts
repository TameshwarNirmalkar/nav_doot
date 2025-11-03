import { createAsyncThunk } from '@reduxjs/toolkit';

export const getZoneListAction = createAsyncThunk('GET_ZONE', async () => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    return [
      { zone_name: 'South', zone_id: 1 },
      { zone_name: 'North', zone_id: 2 },
      { zone_name: 'East', zone_id: 3 },
      { zone_name: 'West', zone_id: 4 },
      { zone_name: 'Centeral', zone_id: 5 },
    ];
  } catch (error: any) {
    throw new Error('Error in zone api');
  }
});

export const addZoneAction = createAsyncThunk('ADD_ZONE', async (args: { zone_name: string; zone_id: number }) => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    return args;
  } catch (error: any) {
    throw new Error('Error in zone api');
  }
});
