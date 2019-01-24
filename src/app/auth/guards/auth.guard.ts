import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as fromStore from '../store';
import { AuthState } from '../store';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.getLoggedUser().pipe(
      mergeMap(user => {
        if (user === null) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return of(false);
        } else {
          setTimeout(() => this.store.dispatch(new fromStore.UserLogged(user)));
          return of(true);
        }
      }),
      take(1),
      catchError(() => this.store.dispatch(new fromStore.LoginRedirect()))
    );
  }

  getLoggedUser(): Observable<User> {
    const user = this.store.selectSnapshot(AuthState.getUser);
    return user ? of(user) : this.authService.whoAmI();
  }
}
