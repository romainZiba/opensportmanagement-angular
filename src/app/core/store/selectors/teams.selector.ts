import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromTeam from "../reducers/teams.reducer";
import { List } from "immutable";
import { Team } from "../../../model/team";

export const getTeamState = createSelector(
  fromFeature.getCoreState,
  (state: fromFeature.CoreState) => state.teams
);

export const getTeamEntities = createSelector(
  getTeamState,
  fromTeam.getEntities
);

export const getTeamLoading = createSelector(getTeamState, fromTeam.getLoading);

export const getTeamLoaded = createSelector(getTeamState, fromTeam.getLoaded);

export const getAllTeams = createSelector(getTeamEntities, entities => {
  return List(Object.keys(entities).map(id => entities[parseInt(id, 10)]));
});

// This test works but it is not the correct way to select
export const getSelectedTeam = createSelector(
  getTeamState,
  (state): Team => {
    return state.entities[state.selectedTeam];
  }
);

// This function does not work but why ?
export const getSelectedTeam2 = createSelector(
  getTeamState,
  fromTeam.getSelectedTeam,
  (state, selectedTeam): Team => {
    return state.entities[selectedTeam];
  }
);
