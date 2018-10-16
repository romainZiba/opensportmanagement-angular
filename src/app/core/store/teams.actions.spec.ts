import { Team } from "../models/team";
import * as fromTeam from "./teams.actions";

describe("Get Teams Actions", () => {
  describe("Load Teams", () => {
    it("should create an action", () => {
      const action = new fromTeam.LoadTeams();
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
      const action = new fromTeam.LoadTeamsSuccess(teams);
      expect({ ...action }).toEqual({
        payload: teams
      });
    });
  });

  describe("Load Teams Failed", () => {
    it("should create an action", () => {
      const error = "error";
      const action = new fromTeam.LoadTeamsFailed(error);
      expect({ ...action }).toEqual({
        payload: error
      });
    });
  });

  describe("Select Team", () => {
    it("should create an action", () => {
      const id = 1;
      const action = new fromTeam.SelectTeam(id);
      expect({ ...action }).toEqual({
        payload: id
      });
    });
  });
});
