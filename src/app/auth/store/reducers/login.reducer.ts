import {User} from '../../models/user';
import * as loginActions from '../actions';

export interface State {
  user: User | null;
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  user: null,
  pending: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: loginActions.LoginActions
): State {
  switch (action.type) {
    case loginActions.LoginActionsType.LOGIN: {
      return {
        ...state,
        pending: true,
        error: null
      }
    }

    case loginActions.LoginActionsType.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        pending: false,
        error: null,
      };
    }

    case loginActions.LoginActionsType.LOGIN_FAILURE: {
      return {
        ...state,
        pending: false,
        error: action.payload
      }
    }

    case loginActions.LoginActionsType.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
export const getPending = (state: State) => state.pending;
export const getErrorMessage = (state: State) => state.error;
