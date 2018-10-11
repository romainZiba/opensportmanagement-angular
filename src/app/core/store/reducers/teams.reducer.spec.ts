import { initialState, reducer } from "./teams.reducer";
import * as teamsActions from "../actions";
import { List } from "immutable";
import { Team } from "../../../model/team";

describe("TeamsReducer", () => {
  const team1: Team = {
    _id: 1,
    name: "team #1",
    sport: "basketball",
    genderKind: "MALE",
    ageGroup: "ADULTS",
    imgUrl: ""
  };

  const team2: Team = {
    _id: 2,
    name: "team #2",
    sport: "football",
    genderKind: "FEMALE",
    ageGroup: "ADULTS",
    imgUrl: ""
  };

  const team3: Team = {
    _id: 3,
    name: "team #3",
    sport: "football",
    genderKind: "MALE",
    ageGroup: "ADULTS",
    imgUrl: ""
  };

  const teams: List<Team> = List([team1, team2, team3]);

  const entities = {
    1: teams.get(0),
    2: teams.get(1),
    3: teams.get(2)
  };

  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("Load teams", () => {
    it("should return loading", () => {
      const action = new teamsActions.LoadTeams();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("Load teams success", () => {
    it("should return loaded with entities", () => {
      const action = new teamsActions.LoadTeamsSuccess(teams);
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("Load teams failed", () => {
    it("should return loaded false", () => {
      const error = "error";
      const action = new teamsActions.LoadTeamsFailed(error);
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("Select team", () => {
    it("should return selected team", () => {
      const action = new teamsActions.SelectTeam(1);
      const result = reducer(
        { ...initialState, entities, loaded: true },
        action
      );
      expect(result).toMatchSnapshot();
    });
  });
});
