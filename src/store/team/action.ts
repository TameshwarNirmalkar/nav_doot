import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TeamEntity } from '.';

export const getTeamListAction = createAsyncThunk<TeamEntity[]>('TEAM/GET_TEAMLIST', async () => {
  try {
    // API Call here
    return [
      {
        id: 1,
        user_email: 'test@amazon.com',
        user_branch: 'Raipur',
        user_name: 'Jeevan Nishad',
        active: false,
        role: 'Admin',
        created_date: new Date().toLocaleDateString('en-GB'),
      },
      {
        id: 2,
        user_email: 'test@amazon.com',
        user_branch: 'Delhi HO',
        user_name: 'Dhiraj Sinha',
        active: false,
        role: 'Admin',
        created_date: new Date().toLocaleDateString('en-GB'),
      },
      {
        id: 3,
        user_email: 'test@amazon.com',
        user_branch: 'Bhilai HO',
        user_name: 'Tameshwar Nirmalkar',
        active: false,
        role: 'Manager',
        created_date: new Date().toLocaleDateString('en-GB'),
      },
      {
        id: 4,
        user_email: 'test@amazon.com',
        user_branch: 'Bhilai HO',
        user_name: 'Abhilash Methew',
        active: false,
        role: 'Admin',
        created_date: new Date().toLocaleDateString('en-GB'),
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

export const updateTeamAction = createAsyncThunk<TeamEntity>('TEAM/UDATE_TEAM', async (arg) => {
  try {
    // API Call here
    return arg;
  } catch (error: any) {
    return error;
  }
});
