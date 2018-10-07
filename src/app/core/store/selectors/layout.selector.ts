import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromLayout from "../reducers/layout.reducer";

export const getLayoutState = createSelector(
  fromFeature.getCoreState,
  (state: fromFeature.CoreState) => state.layout
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
