import { combineReducers, select, Store, StoreModule } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";

import * as fromReducers from "../reducers";
import * as fromSelectors from "../selectors";
import * as fromActions from "../actions";
import { List } from "immutable";
import { Team } from "../../model/team";

describe("Team Selectors", () => {
  let store: Store<fromReducers.CoreState>;

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

  const teamIds = [1, 2, 3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...{},
          core: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe("getTeamState", () => {
    it("should return state of team", () => {
      let result;

      store
        .pipe(select(fromSelectors.getTeamState))
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        ids: [],
        loaded: false,
        loading: false,
        selectedTeamId: null
      });

      store.dispatch(new fromActions.LoadTeamsSuccess(teams));

      expect(result).toEqual({
        entities,
        ids: teamIds,
        loaded: true,
        loading: false,
        selectedTeamId: null
      });
    });
  });

  describe("getTeamEntities", () => {
    it("should return teams as entities", () => {
      let result;

      store
        .pipe(select(fromSelectors.getTeamEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadTeamsSuccess(teams));

      expect(result).toEqual(entities);
    });
  });

  describe("getSelectedId", () => {
    it("should return selected team as an entity", () => {
      let selectedTeam;

      store.dispatch(new fromActions.LoadTeamsSuccess(teams));
      store.dispatch(new fromActions.SelectTeam(team2._id));

      store
        .pipe(select(fromSelectors.getSelectedTeam))
        .subscribe(team => (selectedTeam = team));

      expect(selectedTeam).toEqual(entities[2]);
    });
  });

  describe("getAllTeams", () => {
    it("should return teams as a List", () => {
      let result;

      store
        .pipe(select(fromSelectors.getAllTeams))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadTeamsSuccess(teams));

      expect(result).toEqual(teams.toArray());
    });
  });

  describe("getTeamsLoaded", () => {
    it("should return the teams loaded state", () => {
      let result;

      store
        .pipe(select(fromSelectors.getTeamLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadTeamsSuccess(List()));

      expect(result).toEqual(true);
    });
  });

  describe("getTeamsLoading", () => {
    it("should return the teams loading state", () => {
      let result;

      store
        .pipe(select(fromSelectors.getTeamLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadTeams());

      expect(result).toEqual(true);
    });
  });
});
