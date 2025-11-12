import { createEntityAdapter, createSlice, type EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { toSnakeCaseKeysInArray } from '@src/utility/common_function';
import type { AppState } from '../store_config';
import { addTeamAction, getTeamListAction, updateTeamAction } from './action';

export interface TeamEntity {
  id: EntityId;
  user_email: string;
  user_name: string;
  user_branch: string;
  verified: boolean;
  created_date: string;
  role: string;
}

export interface TeamStateI {
  isLoading: boolean;
  msg: string | null;
  error: boolean;
}

const TeamEntityAdapter = createEntityAdapter<TeamEntity, EntityId>({
  selectId: (drawer: TeamEntity) => drawer.id,
});

const TeamEntitySlice = createSlice({
  name: 'TEAM_SLICE',
  initialState: TeamEntityAdapter.getInitialState<TeamStateI>({
    isLoading: false,
    error: false,
    msg: null,
  }),
  reducers: {
    // drawerUpdate: TeamEntityAdapter.setOne,
    // addDrawer: TeamEntityAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getTeamListAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamListAction.fulfilled, (state: any, action: PayloadAction<TeamEntity[]>) => {
        state.isLoading = false;
        TeamEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addTeamAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addTeamAction.fulfilled, (state: any, action: PayloadAction<TeamEntity>) => {
        state.isLoading = false;
        TeamEntityAdapter.addOne(state, action.payload);
      })
      .addCase(updateTeamAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateTeamAction.fulfilled, (state: any, action: PayloadAction<TeamEntity>) => {
        state.isLoading = false;
        const update = {
          id: action.payload.id,
          changes: {
            ...action.payload,
          },
        };
        TeamEntityAdapter.updateOne(state, update);
      });
  },
});

// Correct slice selector
export const selectTeamEntitySliceState = (state: AppState) => state.team;

// Regenerate selectors with the corrected slice selector
export const { selectById, selectAll: getAllTeams } = TeamEntityAdapter.getSelectors(selectTeamEntitySliceState);
// export const { drawerUpdate, addDrawer } = TeamEntitySlice.actions;
export default TeamEntitySlice.reducer;
