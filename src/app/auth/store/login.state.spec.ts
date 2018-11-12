import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthState, AuthStateModel } from './login.state';
import { HttpResponse } from '@angular/common/http';
import { Login, Logout } from './login.actions';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const user = new User('username', 'firstname', 'lastname', 'email', 'phonenumber');
const authSuccessResponse = new HttpResponse({
  body: null,
  status: 200
});

// TODO: https://github.com/7leads/ngx-cookie-service/issues/39
describe('Auth', () => {
  let store: Store;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([AuthState])],
      providers: [AuthService, CookieService]
    });
    authService = TestBed.get(AuthService);
    cookieService = TestBed.get(CookieService);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    spyOn(authService, 'authenticate').and.returnValue(of(authSuccessResponse));
    spyOn(authService, 'whoAmI').and.returnValue(of(user));
    spyOn(cookieService, 'deleteAll');
  });

  describe('login', () => {
    it('should change pending to true', async(() => {
      store.dispatch(new Login({ username: user.username, password: 'pass' }));
      store.selectOnce(state => state.authState.pending).subscribe(pending => {
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
      store.selectOnce(state => state.authState.user).subscribe(u => {
        expect(u).toBeNull();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(cookieService.deleteAll).toHaveBeenCalledTimes(1);
      });
    }));
  });
});
