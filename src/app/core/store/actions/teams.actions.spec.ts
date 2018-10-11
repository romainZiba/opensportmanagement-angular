import * as fromTeams from "./teams.actions";
import { Team } from "../../../model/team";
import { List } from "immutable";

describe("Get Teams Actions", () => {
  describe("Load Teams", () => {
    it("should create an action", () => {
      const action = new fromTeams.LoadTeams();
      expect({ ...action }).toEqual({
        type: fromTeams.TeamsActionsType.LOAD_TEAMS
      });
    });
  });

  describe("Load Teams Success", () => {
    it("should create an action", () => {
      const team = new Team();
      team._id = 1;
      team.name = 'team';
      const teams = List([team]);
      const action = new fromTeams.LoadTeamsSuccess(teams);
      expect({ ...action }).toEqual({
        type: fromTeams.TeamsActionsType.LOAD_TEAMS_SUCCESS,
        payload: teams
      });
    });
  });

  describe("Load Teams Failed", () => {
    it("should create an action", () => {
      const error = 'error';
      const action = new fromTeams.LoadTeamsFailed(error);
      expect({ ...action }).toEqual({
        type: fromTeams.TeamsActionsType.LOAD_TEAMS_FAILED,
        payload: error
      });
    });
  });

  describe("Select Team", () => {
    it("should create an action", () => {
      const id = 1;
      const action = new fromTeams.SelectTeam(id);
      expect({ ...action }).toEqual({
        type: fromTeams.TeamsActionsType.SELECT_TEAM,
        payload: id
      });
    });
  });
});
