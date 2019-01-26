import { Observable } from 'rxjs/Observable';
import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { of } from 'rxjs/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthState, AuthStateModel } from './login.state';
import { HttpResponse } from '@angular/common/http';
import { Login, Logout } from './login.actions';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { skip, take } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

const user = new User('username', 'firstname', 'lastname', 'email', 'phonenumber');
const authSuccessResponse = new HttpResponse({
  body: null,
  status: 200
});

describe('Auth', () => {
  let store: Store;
  let authServiceMock: AuthService;
  let cookieService: CookieService;
  let router: Router;
  let actions$: Observable<any>;

  beforeEach(async () => {
    authServiceMock = {
      authenticate: jest.fn().mockReturnValue(of(authSuccessResponse)),
      whoAmI: jest.fn().mockReturnValue(of(user)),
      logOut: jest.fn().mockReturnValue(of(true))
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([AuthState])],
      providers: [CookieService, { provide: AuthService, useValue: authServiceMock }]
    });
    cookieService = TestBed.get(CookieService);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    actions$ = TestBed.get(Actions);
    spyOn(cookieService, 'deleteAll');
  });

  describe('login', () => {
    it('should change pending to true', async(() => {
      store.dispatch(new Login({ username: user.username, password: 'pass' }));
      store
        .select(state => state.authState.pending)
        .pipe(
          skip(1),
          take(1)
        )
        .subscribe(pending => {
          expect(pending).toEqual(true);
        });
    }));
  });

  describe('log out', () => {
    const loginState: AuthStateModel = {
      user,
      pending: false,
      error: null
    };

    beforeEach(() => {
      store.reset(loginState);
    });

    it('should change the user state', async(() => {
      store.dispatch(new Logout());
      store
        .selectOnce(state => state.authState.user)
        .subscribe(u => {
          expect(u).toBeNull();
          expect(cookieService.deleteAll).toHaveBeenCalledTimes(1);
        });
    }));

    it('should dispatch a navigate to login action', async(() => {
      actions$.pipe(ofActionDispatched(Navigate)).subscribe(actions => {
        expect(actions).toEqual(new Navigate(['/login']));
      });
      store.dispatch([new Logout()]);
    }));
  });
});
