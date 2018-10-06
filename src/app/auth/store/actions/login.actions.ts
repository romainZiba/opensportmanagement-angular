import {Action} from '@ngrx/store';
import {Credentials, User} from '../../models/user';

export enum LoginActionsType {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_REDIRECT = '[Auth] Login Redirect',
  LOGOUT = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = LoginActionsType.LOGIN;
  constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionsType.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailure implements Action {
  readonly type = LoginActionsType.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LoginActionsType.LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LoginActionsType.LOGOUT;
}

export type LoginActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
