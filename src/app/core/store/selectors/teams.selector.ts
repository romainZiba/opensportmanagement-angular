import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromTeam from "../reducers/teams.reducer";

export const getTeamState = createSelector(
  fromFeature.getCoreState,
  (state: fromFeature.CoreState) => state.teams
);

export const getSelectedTeamId = createSelector(
  getTeamState,
  fromTeam.getSelectedId
);

export const {
  selectEntities: getTeamEntities,
  selectAll: getAllTeams
} = fromTeam.adapter.getSelectors(getTeamState);

export const getTeamLoading = createSelector(getTeamState, fromTeam.getLoading);

export const getTeamLoaded = createSelector(getTeamState, fromTeam.getLoaded);

export const getSelectedTeam = createSelector(
  getTeamEntities,
  getSelectedTeamId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
