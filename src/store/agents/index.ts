import type { AppState } from '@redux-store/store_config';
import { createEntityAdapter, createSlice, type EntityId, type PayloadAction } from '@reduxjs/toolkit';
import { getAgentAction, addAgentAction, updateAgentAction } from './action';

export interface AgentsCollection {
  id: string;
  address: string;
  allow_scan: string;
  alternate_phone: number;
  vendor_name: string;
  city_code: number;
  city_name: string;
  contact_person: string;
  pan_number: string;
  email: string;
  gst_number: string;
  parent_branch_name: string;
  parent_branch_code: number;
  phone: number;
  postal_code: number;
  state_code: number;
  state_name: string;
  create_date: string;
  updated_date: string;
}

interface AgentsStateI {
  isLoading: boolean;
  error: boolean;
  message: string;
}

const AgentsEntityAdapter = createEntityAdapter<AgentsCollection, EntityId>({
  selectId: (branch: AgentsCollection) => branch.id,
  sortComparer: (a: AgentsCollection, b: AgentsCollection) => a.vendor_name.localeCompare(b.vendor_name),
});

const agentsEntitySlice = createSlice({
  name: 'AGENTS_SLICE',
  initialState: AgentsEntityAdapter.getInitialState<AgentsStateI>({
    isLoading: false,
    error: false,
    message: '',
  }),
  reducers: {
    addAgent: AgentsEntityAdapter.addOne,
    updadateAgents: AgentsEntityAdapter.setOne,
    removeAgents: AgentsEntityAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getAgentAction.pending, (state: AgentsStateI) => {
        state.isLoading = true;
      })
      .addCase(getAgentAction.fulfilled, (state: any, action: PayloadAction<AgentsCollection[]>) => {
        state.isLoading = false;
        AgentsEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(addAgentAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addAgentAction.fulfilled, (state: any, action: PayloadAction<AgentsCollection>) => {
        state.isLoading = false;
        AgentsEntityAdapter.addOne(state, action.payload);
      })
      .addCase(updateAgentAction.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateAgentAction.fulfilled, (state: any, action: PayloadAction<AgentsCollection>) => {
        state.isLoading = false;
        const updateObject = {
          id: action.payload.id,
          changes: action.payload,
        };
        AgentsEntityAdapter.updateOne(state, updateObject);
      });
  },
});

export const selectAgentSliceState = (state: AppState) => state.agents;
export const { selectAll: selectAgentList, selectById: selectAgentById } = AgentsEntityAdapter.getSelectors(selectAgentSliceState);
export const { addAgent, updadateAgents, removeAgents } = agentsEntitySlice.actions;
export default agentsEntitySlice.reducer;
