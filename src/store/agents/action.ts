import { createAsyncThunk } from '@reduxjs/toolkit';
import { delayWaitFor } from '@src/utility/delay';
import { AgentsCollection } from '.';

export const getAgentAction = createAsyncThunk('GET_AGENTS', async () => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    return [
      {
        id: '3424-afdsf32-f234f-fdsa3234',
        address: 'test',
        allow_scan: 'Y',
        alternate_phone: '6952425145',
        vendor_name: 'DTDC',
        branchtype_name: 'Regional Office',
        branchtype_id: 3,
        contact_person: 'Jitendra',
        email: 'tapnatwit@gmai.com',
        gst_number: '07AACCJO805D1Z6',
        parent_branch_name: 'Head Office',
        parent_branch_code: 1,
        phone: '09595617447',
        pan_number: 'SGBPM7980P',
        postal_code: '411045',
        city_code: 57981,
        city_name: 'Bhilai',
        state_code: 4040,
        state_name: 'Chhattishgarh',
        created_date: new Date().toLocaleDateString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        updated_date: new Date().toLocaleDateString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      },
    ];
  } catch (error: any) {
    return error;
  }
});

export const addAgentAction = createAsyncThunk('ADD_AGENT', async (args: AgentsCollection) => {
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

export const updateAgentAction = createAsyncThunk('EDIT_AGENT', async (args: AgentsCollection) => {
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
