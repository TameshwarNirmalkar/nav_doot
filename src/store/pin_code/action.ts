import { createAsyncThunk } from "@reduxjs/toolkit";
import { toSnakeCaseKeysInArray } from "@src/utility/common_function";

export const getListByPincodeAction = createAsyncThunk("PIN_CODE/GET_PINCODE", async (arg: { pin_code: string }, { rejectWithValue }) => {
  try {
    const pin_res = await fetch(`https://api.postalpincode.in/pincode/${arg.pin_code}`, {
      method: "GET",
    }).then((res) => res.json());
    const caseChange = toSnakeCaseKeysInArray(pin_res[0].PostOffice);
    return caseChange.map((el) => ({ ...el, id: `${el.pincode}_${el.name.replaceAll(" ", "_")}` }));
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
