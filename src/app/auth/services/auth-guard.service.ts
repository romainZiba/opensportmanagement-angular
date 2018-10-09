import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {select, Store} from '@ngrx/store';

import * as fromStore from '../store';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {catchError, exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<fromStore.AuthState>,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getLoggedUser().pipe(
      exhaustMap(user => {
        if (user === null) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return of(false);
        } else {
          setTimeout(() =>
            this.store.dispatch(new fromStore.LoginSuccess(user))
          );
          return of(true);
        }
      }),
      take(1)
    );
  }

  getLoggedUser(): Observable<User> {
    return this.store.pipe(
      take(1),
      select(fromStore.getUser),
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
