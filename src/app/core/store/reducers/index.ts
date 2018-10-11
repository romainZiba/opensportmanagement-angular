import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromLayout from "./layout.reducer";
import * as fromTeams from "./teams.reducer"

export interface CoreState {
  layout: fromLayout.LayoutState;
  teams: fromTeams.TeamState
}

export const reducers: ActionReducerMap<CoreState> = {
  layout: fromLayout.reducer,
  teams: fromTeams.reducer,
};

export const getCoreState = createFeatureSelector<CoreState>("core");
