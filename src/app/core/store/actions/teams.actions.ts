import { Action } from "@ngrx/store";
import { List } from "immutable";
import { Team } from "../../../model/team";

export enum TeamsActionsType {
  LOAD_TEAMS = "[Core] Load teams",
  LOAD_TEAMS_SUCCESS = "[Core] Load teams success",
  LOAD_TEAMS_FAILED = "[Core] Load teams failed",
  SELECT_TEAM = "[Core] Select team"
}

export class LoadTeams implements Action {
  readonly type = TeamsActionsType.LOAD_TEAMS;
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamsActionsType.LOAD_TEAMS_SUCCESS;
  constructor(public payload: List<Team>) {}
}

export class LoadTeamsFailed implements Action {
  readonly type = TeamsActionsType.LOAD_TEAMS_FAILED;
  constructor(public payload: any) {}
}

export class SelectTeam implements Action {
  readonly type = TeamsActionsType.SELECT_TEAM;
  constructor(public payload: number) {}
}

export type TeamsActions =
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFailed
  | SelectTeam;
