export enum SidenavActionsType {
  OPEN_SIDENAV = "[Layout] Open Sidenav",
  CLOSE_SIDENAV = "[Layout] Close Sidenav"
}

export class OpenSidenav {
  static readonly type = SidenavActionsType.OPEN_SIDENAV;
}

export class CloseSidenav {
  static readonly type = SidenavActionsType.CLOSE_SIDENAV;
}

export type SidenavActions = OpenSidenav | CloseSidenav;
