import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/login.reducer';
import {User} from '../../models/user';

export const getAuthStateStatus = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.status
);

export const getUser = createSelector(getAuthStateStatus, fromAuth.getUser);
export const getLoggedIn = createSelector(getUser, (user: User) => !!user);

export const getErrorMessage = createSelector(
  getAuthStateStatus,
  fromAuth.getErrorMessage
);
export const isLoginPending = createSelector(
  getAuthStateStatus,
  fromAuth.getPending
);
