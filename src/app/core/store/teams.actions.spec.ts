import { Team } from "../models/team";
import * as fromTeam from "./teams.actions";
import * as fromLayout from './layout.actions';

describe("Get Teams Actions", () => {
  describe("Load Teams", () => {
    it("should create an action", () => {
      const action = new fromTeam.LoadTeams();
      expect(fromTeam.LoadTeams.type).toBe(fromTeam.TeamActionsType.LOAD_TEAMS);
      expect({ ...action }).toEqual({});
    });
  });

  describe("Load Teams Success", () => {
    it("should create an action", () => {
      const team: Team = {
        name: "Team #1",
        sport: "Sport",
        genderKind: "MALE",
        ageGroup: "ADULTS"
      };
      team._id = 1;
      team.name = "team";
      const teams = [team];
      expect(fromTeam.LoadTeamsSuccess.type).toBe(fromTeam.TeamActionsType.LOAD_TEAMS_SUCCESS);
      const action = new fromTeam.LoadTeamsSuccess(teams);
      expect({ ...action }).toEqual({
        payload: teams
      });
    });
  });

  describe("Load Teams Failed", () => {
    it("should create an action", () => {
      const error = "error";
      expect(fromTeam.LoadTeamsFailed.type).toBe(fromTeam.TeamActionsType.LOAD_TEAMS_FAILED);
      const action = new fromTeam.LoadTeamsFailed(error);
      expect({ ...action }).toEqual({
        payload: error
      });
    });
  });

  describe("Select Team", () => {
    it("should create an action", () => {
      const id = 1;
      expect(fromTeam.SelectTeam.type).toBe(fromTeam.TeamActionsType.SELECT_TEAM);
      const action = new fromTeam.SelectTeam(id);
      expect({ ...action }).toEqual({
        payload: id
      });
    });
  });
});
