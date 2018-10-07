import { Action } from '@ngrx/store';

export enum SidenavActionsType {
  OPEN_SIDENAV = '[Core] Open Sidenav',
  CLOSE_SIDENAV = '[Core] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = SidenavActionsType.OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = SidenavActionsType.CLOSE_SIDENAV;
}

export type SidenavActions = OpenSidenav | CloseSidenav;
