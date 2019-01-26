import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import * as teamActions from './teams.actions';
import { asapScheduler, of } from 'rxjs/index';
import { catchError, map } from 'rxjs/operators';
import { NgxsEntityStateModel, NgxsEntityAdapter } from './entity';

export class TeamStateModel extends NgxsEntityStateModel<Team> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

@State<TeamStateModel>({
  name: 'teamsState',
  defaults: {
    ...TeamStateModel.initialState(),
    loaded: false,
    loading: false,
    error: null
  }
})
export class TeamsState {
  constructor(private service: TeamService) {}

  @Selector()
  static getTeamEntities(state: TeamStateModel) {
    return state.entities;
  }

  @Selector()
  static getSelected(state: TeamStateModel): number {
    return state.selected;
  }

  @Selector()
  static getSelectedTeam(state: TeamStateModel): Team {
    return state.entities[this.getSelected(state)];
  }

  @Selector()
  static getIds(state: TeamStateModel) {
    return state.ids;
  }

  @Selector()
  static isLoading(state: TeamStateModel) {
    return state.loading;
  }

  @Selector()
  static isLoaded(state: TeamStateModel) {
    return state.loaded;
  }

  @Selector()
  static getAllTeams(state: TeamStateModel) {
    const teamEntities = TeamsState.getTeamEntities(state);
    return NgxsEntityAdapter.getItemsFromEntities(teamEntities);
  }

  @Selector()
  static getError(state: TeamStateModel) {
    return state.error;
  }

  @Action(teamActions.LoadTeams)
  loadTeams(ctx: StateContext<TeamStateModel>) {
    ctx.patchState({
      loading: true
    });
    return this.service
      .getTeams()
      .pipe(
        map(
          teams =>
            asapScheduler.schedule(() => ctx.dispatch(new teamActions.LoadTeamsSuccess(teams))),
          catchError(error =>
            of(asapScheduler.schedule(() => ctx.dispatch(new teamActions.LoadTeamsFailed(error))))
          )
        )
      );
  }

  @Action(teamActions.LoadTeamsSuccess)
  loadTeamsSuccess(ctx: StateContext<TeamStateModel>, { payload }: teamActions.LoadTeamsSuccess) {
    NgxsEntityAdapter.addAll(payload, ctx, '_id');
    ctx.patchState({
      loaded: true,
      loading: false
    });
  }

  @Action(teamActions.LoadTeamsFailed)
  loadTeamsFail(
    { patchState }: StateContext<TeamStateModel>,
    { payload }: teamActions.LoadTeamsFailed
  ) {
    patchState({ loaded: false, loading: false, error: payload });
  }

  @Action(teamActions.SelectTeam)
  selectTeam({ patchState }: StateContext<TeamStateModel>, { payload }: teamActions.SelectTeam) {
    patchState({ selected: payload });
  }
}
