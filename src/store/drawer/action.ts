import { createAsyncThunk } from "@reduxjs/toolkit";
import { type DrawerListEntity } from ".";

// 1. Define the async thunk
export const getDrawerListAction = createAsyncThunk(
  "DRAWER/ADDLIST", // Base action type (will generate /pending, /fulfilled, /rejected)
  async (_, { rejectWithValue }) => {
    try {
      const generateTenItems: DrawerListEntity[] = Array.from(Array(10), (_, index) => ({
        drawerId: `drawer_${index + 1}`,
        isCollapsed: false,
      }));
      return generateTenItems;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
