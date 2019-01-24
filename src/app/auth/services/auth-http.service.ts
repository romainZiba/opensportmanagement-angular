import { AUTH_API } from './../token';
import { Api } from './../../core/models/api';
import { AuthService } from './auth.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService implements AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(AUTH_API) private authApi: Api
  ) {}

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      '/login',
      { username, password },
      { observe: 'response', withCredentials: true }
    );
  }

  whoAmI(): Observable<User> {
    return this.http
      .get<User>(`${this.authApi}/me`, {
        observe: 'response',
        withCredentials: true
      })
      .pipe(map(response => (response.status === 200 ? response.body : null)));
  }

  logOut(): Observable<boolean> {
    localStorage.clear();
    this.cookieService.delete('open_session');
    return of(true);
  }
}
