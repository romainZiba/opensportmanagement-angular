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
  closeSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: false
    });
  }

  @Action(OpenSidenav)
  openSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: true
    });
  }
}
