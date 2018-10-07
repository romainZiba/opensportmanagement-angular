import { Component, OnInit } from "@angular/core";
import { Credentials } from "../models/user";
import { select, Store } from "@ngrx/store";
import { State } from "../store/reducers/login.reducer";
import * as authActions from "../store/actions";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../store";

@Component({
  selector: "app-login",
  template: `<login-form
    [pending]="pending$ | async"
    [errorMessage]="error$ | async"
    (credentials)="login($event)"></login-form>`
})
export class LoginPageComponent implements OnInit {
  pending$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.pending$ = this.store.pipe(select(fromStore.isLoginPending));
    this.error$ = this.store.pipe(select(fromStore.getErrorMessage));
  }

  login(creds: Credentials): void {
    console.log("trying to log");
    this.store.dispatch(new authActions.Login(creds));
  }
}
