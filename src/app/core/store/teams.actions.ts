import { Team } from "../models/team";

export enum TeamActionsType {
  LOAD_TEAMS = "[Team] Load Teams",
  LOAD_TEAMS_SUCCESS = "[Team] Load teams succeeded",
  LOAD_TEAMS_FAILED = "[Team] Load teams failed",
  SELECT_TEAM = "[Team] Select team"
}

export class LoadTeams {
  static readonly type = TeamActionsType.LOAD_TEAMS;
}

export class LoadTeamsSuccess {
  static readonly type = TeamActionsType.LOAD_TEAMS_SUCCESS;
  constructor(public payload: Team[]) {}
}

export class LoadTeamsFailed {
  static readonly type = TeamActionsType.LOAD_TEAMS_FAILED;
  constructor(public payload: any) {}
}

export class SelectTeam {
  static readonly type = TeamActionsType.SELECT_TEAM;
  constructor(public payload: number) {}
}
