import * as fromActions from "../actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Team } from "../../model/team";

export interface State extends EntityState<Team> {
  selectedTeamId: number | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>({
  selectId: (team: Team) => team._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedTeamId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: fromActions.TeamsActions
): State {
  switch (action.type) {
    case fromActions.TeamsActionsType.LOAD_TEAMS:
      return {
        ...state,
        loading: true
      };

    case fromActions.TeamsActionsType.LOAD_TEAMS_SUCCESS: {
      const teams = action.payload;
      state = { ...state, loaded: true, loading: false };
      return adapter.addAll(teams, state);
    }

    case fromActions.TeamsActionsType.LOAD_TEAMS_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.TeamsActionsType.SELECT_TEAM: {
      return {
        ...state,
        selectedTeamId: action.payload
      };
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getSelectedId = (state: State) => state.selectedTeamId;
