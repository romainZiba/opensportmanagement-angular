import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs/observable/of";

import * as fromActions from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import * as teamActions from "../actions/teams.actions";
import { TeamService } from "../../services/team.service";

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(fromActions.TeamsActionsType.LOAD_TEAMS),
    switchMap(() => {
      console.log("Pl");
      return this.teamService.getTeams().pipe(
        map(teams => new teamActions.LoadTeamsSuccess(teams)),
        catchError(error => of(new teamActions.LoadTeamsFailed(error)))
      );
    })
  );
}
