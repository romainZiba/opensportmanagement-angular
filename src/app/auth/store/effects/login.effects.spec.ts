import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {Actions} from '@ngrx/effects';

import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {of} from 'rxjs/observable/of';

import {AuthService} from '../../services/auth.service';
import * as fromEffects from './login.effects';
import * as fromActions from '../actions/login.actions';
import {User} from '../../models/user';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("LoginEffects", () => {
  let actions$: TestActions;
  let service: AuthService;
  let effects: fromEffects.LoginEffects;

  const user = new User(
    "username",
    "firstName",
    "lastName",
    "email",
    "phoneNumber"
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        fromEffects.LoginEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });
    actions$ = TestBed.get(Actions);
    service = TestBed.get(AuthService);
    effects = TestBed.get(fromEffects.LoginEffects);

    spyOn(service, "authenticate").and.returnValue(of({ status: 200 }));
    spyOn(service, "whoAmI").and.returnValue(of(user));
  });

  describe("log in", () => {
    it("should return an user from LoginSuccess", () => {
      const action = new fromActions.Login({
        username: user.username,
        password: "password"
      });
      const completion = new fromActions.LoginSuccess(user);

      actions$.stream = hot("-a", { a: action });
      const expected = cold("-b", { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });
  });
});
