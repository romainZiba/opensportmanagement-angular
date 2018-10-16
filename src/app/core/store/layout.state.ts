import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CloseSidenav, OpenSidenav } from "./layout.actions";

export class LayoutStateModel {
  showSidenav: boolean;
}

@State<LayoutStateModel>({
  name: "layoutState",
  defaults: {
    showSidenav: false
  }
})
export class LayoutState {
  constructor() {}

  @Selector()
  static getShowSidenav(state: LayoutStateModel) {
    return state.showSidenav;
  }

  @Action(CloseSidenav)
  loadTeams({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: false
    });
  }

  @Action(OpenSidenav)
  loadTeamsSuccess({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: true
    });
  }
}
