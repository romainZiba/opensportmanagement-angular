import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromActions from '../store/actions';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromStore.AuthState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new fromActions.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
