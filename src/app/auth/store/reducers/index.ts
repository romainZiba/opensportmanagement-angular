import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromAuth from "./login.reducer";

export interface AuthState {
  status: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer
};

export const getAuthState = createFeatureSelector<AuthState>("auth");
