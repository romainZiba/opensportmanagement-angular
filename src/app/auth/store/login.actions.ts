import { Credentials, User } from "../models/user";

export enum LoginActionsType {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  LOGIN_REDIRECT = "[Auth] Login Redirect",
  LOGOUT = "[Auth] Logout",
  USER_LOGGED = "[Auth] User logged"
}

export class Login {
  static readonly type = LoginActionsType.LOGIN;
  constructor(public payload: Credentials) {}
}

export class LoginSuccess {
  static readonly type = LoginActionsType.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailure {
  static readonly type = LoginActionsType.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LoginRedirect {
  static readonly type = LoginActionsType.LOGIN_REDIRECT;
}

export class Logout {
  static readonly type = LoginActionsType.LOGOUT;
}

export class UserLogged {
  static readonly type = LoginActionsType.USER_LOGGED;
  constructor(public payload: User) {}
}
