import { User } from './../models/user';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { USERS_MOCK } from '../mocks/users.mock';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements AuthService {
  authenticated = false;

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    if (USERS_MOCK.map(user => user.username).includes(username) && password) {
      this.authenticated = true;
      return of(new HttpResponse({ status: 200 }));
    }
    return throwError('Login failed.');
  }
  whoAmI(): Observable<User> {
    return this.authenticated ? of(USERS_MOCK[0]) : throwError('User not logged');
  }
  logOut(): Observable<boolean> {
    return of(true);
  }
}
