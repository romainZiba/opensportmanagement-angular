import {combineReducers, select, Store, StoreModule} from '@ngrx/store';

import {TestBed} from '@angular/core/testing';

import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';
import {User} from '../../models/user';

describe("Login Selectors", () => {
  let store: Store<fromReducers.AuthState>;

  const user = new User("RR", "Romain", "Romain", "rr@rr.fr", "");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...{},
          auth: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe("getAuthState", () => {
    it("should return state of auth", () => {
      let result;

      store
        .pipe(select(fromSelectors.getAuthStateStatus))
        .subscribe(value => (result = value));

      expect(result).toEqual({
        user: null,
        pending: false,
        error: null
      });

      store.dispatch(new fromActions.LoginSuccess(user));

      expect(result).toEqual({
        user,
        pending: false,
        error: null
      });
    });
  });
});
