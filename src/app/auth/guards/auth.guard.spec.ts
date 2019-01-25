import { USERS_MOCK } from './../mocks/users.mock';
import { AuthState } from './../store/login.state';
import { Observable } from 'rxjs/Observable';
import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { of } from 'rxjs/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { LoginRedirect } from '..';

describe('Auth Guard', () => {
  let store: Store;
  let authServiceMock: AuthService;
  let actions$: Observable<any>;
  let guard: AuthGuard;

  describe('Who am I webservice returns null', () => {
    describe('with initial state', () => {
      beforeEach(async () => {
        authServiceMock = {
          authenticate: jest.fn(),
          whoAmI: jest.fn().mockReturnValue(of(null)),
          logOut: jest.fn().mockReturnValue(of(true))
        };
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([AuthState])],
          providers: [CookieService, { provide: AuthService, useValue: authServiceMock }]
        });
        store = TestBed.get(Store);
        actions$ = TestBed.get(Actions);
        guard = TestBed.get(AuthGuard);
      });

      it('should redirect to login', async(() => {
        actions$.pipe(ofActionDispatched(LoginRedirect)).subscribe(actions => {
          expect(actions).toEqual(new LoginRedirect());
        });
        guard.canActivate().subscribe();
      }));

      it('should not activate the route', async(() => {
        guard.canActivate().subscribe(activated => expect(activated).toBe(false));
      }));
    });

    describe('with a state which contains an user authenticated', () => {
      beforeEach(async () => {
        authServiceMock = {
          authenticate: jest.fn(),
          whoAmI: jest.fn().mockReturnValue(of(null)),
          logOut: jest.fn().mockReturnValue(of(true))
        };
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([AuthState])],
          providers: [CookieService, { provide: AuthService, useValue: authServiceMock }]
        });
        store = TestBed.get(Store);
        actions$ = TestBed.get(Actions);
        guard = TestBed.get(AuthGuard);
        store.reset({
          authState: {
            user: USERS_MOCK[0],
            pending: false,
            error: null
          }
        });
      });

      it('should activate the route', async(() => {
        guard.canActivate().subscribe(activated => expect(activated).toBe(true));
      }));
    });
  });

  describe('Who am I webservice returns an user', () => {
    beforeEach(async () => {
      authServiceMock = {
        authenticate: jest.fn(),
        whoAmI: jest.fn().mockReturnValue(of(USERS_MOCK[0])),
        logOut: jest.fn().mockReturnValue(of(true))
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([AuthState])],
        providers: [CookieService, { provide: AuthService, useValue: authServiceMock }]
      });
      store = TestBed.get(Store);
      guard = TestBed.get(AuthGuard);
    });

    it('should activate the route', async(() => {
      guard.canActivate().subscribe(activated => expect(activated).toBe(true));
    }));
  });
});
