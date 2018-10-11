import * as fromActions from "../actions";

export interface LayoutState {
  showSidenav: boolean;
}

const initialState: LayoutState = {
  showSidenav: false
};

export function reducer(
  state: LayoutState = initialState,
  action: fromActions.SidenavActions
): LayoutState {
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

export const getShowSidenav = (state: LayoutState) => state.showSidenav;
