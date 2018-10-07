import {combineReducers, select, Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';

import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

describe("Login Selectors", () => {
  let store: Store<fromReducers.CoreState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...{},
          core: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe("getSidenavState", () => {
    it("should return state of layout", () => {
      let result;

      store
        .pipe(select(fromSelectors.getShowSidenav))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.OpenSidenav());

      expect(result).toEqual(true);

      store.dispatch(new fromActions.CloseSidenav());

      expect(result).toEqual(false);
    });
  });
});
