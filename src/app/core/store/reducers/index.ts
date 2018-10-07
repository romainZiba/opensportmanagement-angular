import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromLayout from "./layout.reducer";

export interface CoreState {
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  layout: fromLayout.reducer
};

export const getCoreState = createFeatureSelector<CoreState>("core");
