import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngxs/store';
import { AuthState, Login } from '../store';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form
      [pending]="loggingIn$ | async"
      [errorMessage]="error$ | async"
      (credentials)="login($event)"></app-login-form>`
})
export class LoginPageComponent implements OnInit {
  loggingIn$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loggingIn$ = this.store.select(AuthState.isLoggingIn);
    this.error$ = this.store.select(AuthState.getError);
  }

  login(creds: Credentials): void {
    this.store.dispatch(new Login(creds));
  }
}
