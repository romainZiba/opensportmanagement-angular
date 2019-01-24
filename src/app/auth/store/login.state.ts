import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Login,
  LoginFailure,
  LoginRedirect,
  LoginSuccess,
  Logout,
  UserLogged
} from './login.actions';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

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
  constructor(
    private service: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

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
    return this.service.authenticate(payload.username, payload.password).pipe(
      mergeMap(() => {
        return this.service.whoAmI().pipe(
          mergeMap(user => dispatch(new LoginSuccess(user))),
          catchError(error => dispatch(new LoginFailure(error)))
        );
      }),
      catchError(error => dispatch(new LoginFailure(error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ patchState }: StateContext<AuthStateModel>, { payload }: LoginSuccess) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
    this.router.navigate(['/']);
  }

  @Action(UserLogged)
  userLogged({ patchState }: StateContext<AuthStateModel>, { payload }: UserLogged) {
    patchState({
      pending: false,
      user: payload,
      error: null
    });
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
  loginRedirect() {
    this.router.navigate(['/login']);
  }
}
