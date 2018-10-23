import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {of} from 'rxjs/observable/of';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TeamService} from '../services/team.service';
import {Team} from '../models/team';
import {TeamsState, TeamStateModel} from './teams.state';
import {LoadTeams, LoadTeamsFailed, LoadTeamsSuccess, SelectTeam} from './teams.actions';

describe("Teams", () => {
  let store: Store;
  let service: TeamService;

  const team1: Team = { _id: 1, name: "team #1", sport: "basketball", genderKind: "MALE", ageGroup: "ADULTS", imgUrl: "" };

  const team2: Team = { _id: 2, name: "team #2", sport: "football", genderKind: "FEMALE", ageGroup: "ADULTS", imgUrl: "" };

  const team3: Team = { _id: 3, name: "team #3", sport: "football", genderKind: "MALE", ageGroup: "ADULTS", imgUrl: "" };

  const teams: Team[] = [team1, team2, team3];

  const entities = { 1: team1, 2: team2, 3: team3 };

  const ids = teams.map(team => team._id);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([TeamsState])
      ],
      providers: [TeamService]
    });

    service = TestBed.get(TeamService);
    store = TestBed.get(Store);

    spyOn(service, "getTeams").and.returnValue(of(teams));
  });

  it("should change loading to true", async(() => {
    store.dispatch(new LoadTeams());
    store.selectOnce(state => state.teamsState).subscribe(teamState => {
      expect(teamState).toEqual({
        entities: {},
        ids: [],
        selected: null,
        loading: true,
        loaded: false,
        error: null
      });
    });
  }));

  it("should get loaded teams", async(() => {
    store.dispatch(new LoadTeamsSuccess(teams));
    store.selectOnce(state => state.teamsState).subscribe(teamState => {
      expect(teamState).toEqual({
        entities,
        ids,
        selected: null,
        loading: false,
        loaded: true,
        error: null
      });
    });
  }));

  it("should not get teams", async(() => {
    const error = "error";
    store.dispatch(new LoadTeamsFailed(error));
    store.selectOnce(state => state.teamsState).subscribe(teamState => {
      expect(teamState).toEqual({
        entities: {},
        ids: [],
        selected: null,
        loading: false,
        loaded: false,
        error
      });
    });
  }));

  it("should select team", async(() => {
    const initialState = {
      entities,
      ids,
      selected: null,
      loading: false,
      loaded: true,
      error: null
    } as TeamStateModel;
    store.reset({teamsState: initialState});
    store.dispatch(new SelectTeam(1));
    store.selectOnce(state => state.teamsState).subscribe(teamState => {
      expect(teamState).toEqual({
        entities,
        ids,
        selected: 1,
        loading: false,
        loaded: true,
        error: null
      });
    });
  }));
});
