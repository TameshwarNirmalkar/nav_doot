import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMenuListAction = createAsyncThunk('GET_MENU_LIST', async () => {
  try {
    const generateMenuItems = [];
    return [];
  } catch (error: any) {
    throw new Error(error.message);
  }
});
