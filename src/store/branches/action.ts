import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

export const getBranchesAction = createAsyncThunk('GET_BRANCHES', async () => {
  try {
    // const res = await fetch(`https://csc.sidsworld.co.in/api/countries`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());

    // return res.countries;
    return Array.from({ length: 10 }, (_, index) => ({
      address: 'test',
      allow_scan: 'Y',
      alternate_phone: '6952425145',
      branch_name: `Delhi branch ${index + 1}`,
      branchtype_name: 'Regional Office',
      branchtype_id: 3,
      city_code: 57981,
      city_name: 'Bhilai',
      contact_person: 'Jitendra',
      email: 'tapnatwit@gmai.com',
      gst_number: '07AACCJO805D1Z6',
      id: uuid4(),
      parent_branch_name: 'Head Office',
      parent_branch_code: 1,
      phone: '09595617447',
      postal_code: '411045',
      state_code: 4040,
      state_name: 'Chhattishgarh',
      created_date: new Date().toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      updated_date: new Date().toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    }));
  } catch (error: any) {
    return error;
  }
});
