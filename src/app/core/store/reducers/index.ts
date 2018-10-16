import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromLayout from "./layout.reducer";
import * as fromTeam from "./teams.reducer";

export interface CoreState {
  layout: fromLayout.LayoutState;
  teams: fromTeam.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  layout: fromLayout.reducer,
  teams: fromTeam.reducer
};

export const getCoreState = createFeatureSelector<CoreState>("core");
