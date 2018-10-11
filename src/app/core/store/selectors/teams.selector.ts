import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromTeam from "../reducers/teams.reducer";
import { List } from "immutable";

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

export const getSelectedTeam = createSelector(
  getTeamEntities,
  fromTeam.getSelectedTeam,
  (entities, selectedTeamId) => entities[selectedTeamId]
);
