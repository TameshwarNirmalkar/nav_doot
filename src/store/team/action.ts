import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TeamEntity } from '.';

export const getTeamListAction = createAsyncThunk<TeamEntity[]>('TEAM/GET_TEAMLIST', async () => {
  try {
    // API Call here
    return [
      {
        id: uuidv4(),
        email: 'test@amazon.com',
        verified: false,
      },
      {
        id: uuidv4(),
        email: 'test2@amazon.com',
        verified: true,
      },
    ];
  } catch (error: any) {
    return error;
  }
});

export const addTeamAction = createAsyncThunk<TeamEntity>('TEAM/ADD_TEAM', async (arg) => {
  try {
    // API Call here
    return arg;
  } catch (error: any) {
    return error;
  }
});
