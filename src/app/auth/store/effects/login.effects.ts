import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs/observable/of";

import * as fromActions from "../actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  authenticationError = "Failed to authenticate";

  @Effect()
  login$ = this.actions$.pipe(
    ofType(fromActions.LoginActionsType.LOGIN),
    map((action: fromActions.Login) => action.payload),
    switchMap(credentials => {
      return this.authService
        .authenticate(credentials.username, credentials.password)
        .pipe(
          switchMap(() => {
            return this.authService.whoAmI().pipe(
              map(user => new fromActions.LoginSuccess(user)),
              catchError(() =>
                of(new fromActions.LoginFailure(this.authenticationError))
              )
            );
          }),
          catchError(() =>
            of(new fromActions.LoginFailure(this.authenticationError))
          )
        );
    }),
    catchError(() => of(new fromActions.LoginFailure(this.authenticationError)))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(fromActions.LoginActionsType.LOGIN_SUCCESS),
    tap(() => this.router.navigate(["/"]))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      fromActions.LoginActionsType.LOGIN_REDIRECT,
      fromActions.LoginActionsType.LOGOUT
    ),
    tap(() => {
      this.router.navigate(["/login"]);
    })
  );

  @Effect()
  checkToken$ = this.actions$.pipe(
    ofType(fromActions.LoginActionsType.CHECK_TOKEN_VALID),
    switchMap(() => {
      return this.authService.whoAmI().pipe(
        map(user => new fromActions.LoginSuccess(user)),
        catchError(() =>
          of(new fromActions.LoginFailure(this.authenticationError))
        )
      );
    })
  );
}
