import * as fromActions from "../actions";
import { Team } from "../../../model/team";

export interface TeamState {
  entities: { [id: number]: Team };
  loading: boolean;
  loaded: boolean;
  selectedTeam: number | null;
}

export const initialState: TeamState = {
  entities: {},
  loading: false,
  loaded: false,
  selectedTeam: null,
};

export function reducer(
  state: TeamState = initialState,
  action: fromActions.TeamsActions
): TeamState {
  switch (action.type) {
    case fromActions.TeamsActionsType.LOAD_TEAMS:
      return {
        ...state,
        loading: true
      };

    case fromActions.TeamsActionsType.LOAD_TEAMS_SUCCESS: {
      const entities = action.payload.reduce(
        (e: { [id: number]: Team }, team: Team) => {
          return {
            ...e,
            [team._id]: team
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromActions.TeamsActionsType.LOAD_TEAMS_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.TeamsActionsType.SELECT_TEAM: {
      const selectedTeam = action.payload;
      return {
        ...state,
        selectedTeam
      };
    }

    default:
      return state;
  }
}

export const getEntities = (state: TeamState) => state.entities;
export const getLoading = (state: TeamState) => state.loading;
export const getLoaded = (state: TeamState) => state.loaded;
export const getSelectedTeam = (state: TeamState) => state.selectedTeam;
