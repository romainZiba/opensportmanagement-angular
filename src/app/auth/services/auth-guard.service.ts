import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import * as fromStore from "../store";
import { AuthState } from "../store";
import { AuthService } from "./auth.service";
import { User } from "../models/user";
import { catchError, exhaustMap, take } from "rxjs/operators";
import { Store } from "@ngxs/store";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.getLoggedUser().pipe(
      exhaustMap(user => {
        if (user === null) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return of(false);
        } else {
          setTimeout(() => this.store.dispatch(new fromStore.UserLogged(user)));
          return of(true);
        }
      }),
      take(1)
    );
  }

  getLoggedUser(): Observable<User> {
    return this.store.selectOnce(AuthState.getUser).pipe(
      exhaustMap(user => {
        if (user === null) {
          return this.authService.whoAmI();
        }
        return of(user);
      }),
      catchError(() => of(null))
    );
  }
}
