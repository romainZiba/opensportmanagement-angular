import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { Actions } from "@ngrx/effects";

import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";

import * as fromEffects from "./teams.effects";
import * as fromActions from "../actions/teams.actions";
import { TeamService } from "../../services/team.service";
import { Team } from "../../model/team";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("TeamsEffects", () => {
  let actions$: TestActions;
  let service: TeamService;
  let effects: fromEffects.TeamEffects;

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

  const teams: Team[] = [team1, team2, team3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TeamService,
        fromEffects.TeamEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(TeamService);
    effects = TestBed.get(fromEffects.TeamEffects);

    spyOn(service, "getTeams").and.returnValue(of(teams));
  });

  describe("loadTeams$", () => {
    it("should return a collection from LoadTeamsSuccess", () => {
      const action = new fromActions.LoadTeams();
      const completion = new fromActions.LoadTeamsSuccess(teams);

      actions$.stream = hot("-a", { a: action });
      const expected = cold("-b", { b: completion });

      expect(effects.loadTeams$).toBeObservable(expected);
    });
  });
});
