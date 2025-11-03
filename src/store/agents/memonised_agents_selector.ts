import { createSelector } from '@reduxjs/toolkit';
import { selectAgentSliceState } from '.';

export const agentsIsLoading = createSelector([selectAgentSliceState], (agentsState) => agentsState.isLoading);
