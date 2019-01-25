import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Login,
  LoginFailure,
  LoginRedirect,
  LoginSuccess,
  Logout,
  UserLogged,
  LoadUser,
  UserNotLogged
} from './login.actions';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Navigate } from '@ngxs/router-plugin';

export class AuthStateModel {
  user: User;
  pending: boolean;
  error: string;
}

@State<AuthStateModel>({
  name: 'authState',
  defaults: {
    user: null,
    pending: false,
    error: null
  }
})
export class AuthState {
  constructor(private authService: AuthService, private cookieService: CookieService) {}

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
  login({ patchState, dispatch }: StateContext<AuthStateModel>, { payload }: Login) {
    patchState({
      pending: true,
      error: null
    });
    return this.authService.authenticate(payload.username, payload.password).pipe(
      mergeMap(() => {
        return this.authService.whoAmI().pipe(
          mergeMap(user => dispatch(new LoginSuccess(user))),
          catchError(error => dispatch(new LoginFailure(error)))
        );
      }),
      catchError(error => dispatch(new LoginFailure(error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ dispatch, patchState }: StateContext<AuthStateModel>, { payload }: LoginSuccess) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
    dispatch(new Navigate(['/']));
  }

  @Action(UserLogged)
  userLogged({ patchState }: StateContext<AuthStateModel>, { payload }: UserLogged) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
  }

  @Action(UserNotLogged)
  userNotLogged({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      pending: false,
      user: null,
      error: null
    });
  }

  @Action(LoadUser)
  loadUser(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    if (state.user) {
      return ctx.dispatch(new UserLogged(state.user));
    }
    return this.authService.whoAmI().pipe(
      map(user => ctx.dispatch(new UserLogged(user))),
      catchError(() => ctx.dispatch(new UserNotLogged()))
    );
  }

  @Action(LoginFailure)
  loginFailed({ patchState }: StateContext<AuthStateModel>, { payload }: LoginFailure) {
    patchState({
      pending: false,
      user: null,
      error: payload
    });
  }

  @Action([Logout])
  logOut({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      user: null
    });
    this.cookieService.deleteAll();
  }

  @Action([LoginRedirect, Logout])
  loginRedirect({ dispatch }: StateContext<AuthStateModel>) {
    dispatch(new Navigate(['/login']));
  }
}
