import { createAsyncThunk } from '@reduxjs/toolkit';
import { delayWaitFor } from '@src/utility/delay';

export const getbranchTypeListAction = createAsyncThunk('GET_BRANCH_TYPE', async () => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    return [
      { branchtype_name: 'Head Office', branchtype_id: 1 },
      { branchtype_name: 'Regional Office', branchtype_id: 3 },
      { branchtype_name: 'Branch Office', branchtype_id: 8 },
      { branchtype_name: 'Business Associates', branchtype_id: 10 },
      { branchtype_name: 'Customers', branchtype_id: 11 },
      { branchtype_name: 'Vendor', branchtype_id: 12 },
    ];
  } catch (error: any) {
    throw new Error('Error in zone api');
  }
});

export const addBranchTypeAction = createAsyncThunk('ADD_BRANCH_TYPE', async (args: { branchtype_name: string; branchtype_id: number }) => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    await delayWaitFor(3000);
    return args;
  } catch (error: any) {
    throw new Error('Error in zone api');
  }
});

export const updateBranchTypeAction = createAsyncThunk('EDIT_BRANCH_TYPE', async (args: { branchtype_name: string; branchtype_id: number }) => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    await delayWaitFor(3000);
    return args;
  } catch (error: any) {
    throw new Error('Error in zone api');
  }
});
