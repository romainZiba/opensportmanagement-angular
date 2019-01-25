import { AuthState } from './../store/login.state';
import { Credentials } from './../models/credentials';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Select } from '@ngxs/store';
import { Login } from '../store';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form
      [pending]="loggingIn$ | async"
      [errorMessage]="error$ | async"
      (credentials)="login($event)"
    ></app-login-form>
  `
})
export class LoginPageComponent {
  @Select(AuthState.isLoggingIn) loggingIn$: Observable<boolean>;
  @Select(AuthState.getError) error$: Observable<string>;

  constructor(private store: Store) {}

  login(creds: Credentials): void {
    this.store.dispatch(new Login(creds));
  }
}
