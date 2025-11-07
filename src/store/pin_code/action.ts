import { createAsyncThunk } from '@reduxjs/toolkit';
import { toSnakeCaseKeysInArray } from '@src/utility/common_function';

export const getListByPincodeAction = createAsyncThunk('PIN_CODE/GET_PINCODE', async (arg: { pin_code: string }, { rejectWithValue }) => {
  try {
    const pin_res = await fetch(`https://api.postalpincode.in/pincode/${arg.pin_code}`).then((res) => res.json());
    const caseChange = toSnakeCaseKeysInArray(pin_res.PostOffice);
    console.log('DATA: ', caseChange);
    return pin_res.PostOffice ? caseChange : pin_res.PostOffice;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
