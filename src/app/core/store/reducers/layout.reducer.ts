import * as fromActions from "../actions";

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false
};

export function reducer(
  state: State = initialState,
  action: fromActions.SidenavActions
): State {
  switch (action.type) {
    case fromActions.SidenavActionsType.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case fromActions.SidenavActionsType.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
