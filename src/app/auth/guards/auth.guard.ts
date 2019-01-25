import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LoginRedirect, LoadUser } from '../store';
import { take, mergeMap, catchError, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.getLoggedUser().pipe(
      mergeMap(user => {
        if (user === null) {
          this.store.dispatch(new LoginRedirect());
          return of(false);
        }
        return of(true);
      }),
      take(1),
      catchError(() => this.store.dispatch(new LoginRedirect()))
    );
  }

  getLoggedUser(): Observable<User> {
    return this.store.dispatch(new LoadUser()).pipe(
      map(state => (state.authState.user ? state.authState.user : null)),
      take(1)
    );
  }
}
