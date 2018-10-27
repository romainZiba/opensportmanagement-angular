import { User } from "../models/user";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {
  Login,
  LoginFailure,
  LoginRedirect,
  LoginSuccess,
  Logout,
  UserLogged
} from "./login.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { asapScheduler } from "rxjs/index";
import { Navigate } from "@ngxs/router-plugin";

export class AuthStateModel {
  user: User | null;
  pending: boolean;
  error: string | null;
}

@State<AuthStateModel>({
  name: "authState",
  defaults: {
    user: null,
    pending: false,
    error: null
  }
})
export class AuthState {
  constructor(private service: AuthService, private router: Router) {}

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static isLogged(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static isLoggingIn(state: AuthStateModel) {
    return state.pending;
  }

  @Selector()
  static getError(state: AuthStateModel) {
    return state.error;
  }

  @Action(Login)
  login(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload }: Login
  ) {
    patchState({
      pending: true,
      error: null
    });
    return this.service.authenticate(payload.username, payload.password).pipe(
      switchMap(() => {
        return this.service
          .whoAmI()
          .pipe(
            map(
              user =>
                asapScheduler.schedule(() => dispatch(new LoginSuccess(user))),
              catchError(error => dispatch(new LoginFailure(error)))
            )
          );
      }),
      catchError(error => dispatch(new LoginFailure(error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload }: LoginSuccess
  ) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
    dispatch(new Navigate(["/"]));
  }

  @Action(UserLogged)
  userLogged(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload }: UserLogged
  ) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
  }

  @Action(LoginFailure)
  loginFailed(
    { patchState }: StateContext<AuthStateModel>,
    { payload }: LoginFailure
  ) {
    patchState({
      pending: false,
      user: null,
      error: payload
    });
  }

  @Action([LoginRedirect, Logout])
  loginRedirect({ dispatch }: StateContext<AuthStateModel>) {
    dispatch(new Navigate(["/login"]));
  }
}
