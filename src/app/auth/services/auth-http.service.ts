import { AUTH_API_URL, ACCOUNT_API_URL } from './../token';
import { AuthService } from './auth.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService implements AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(AUTH_API_URL) private authUrl: string,
    @Inject(ACCOUNT_API_URL) private accountUrl: string
  ) {}

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      this.authUrl,
      { username, password },
      { observe: 'response', withCredentials: true }
    );
  }

  whoAmI(): Observable<User> {
    return this.http.get<User>(`${this.accountUrl}/me`, { withCredentials: true });
  }

  logOut(): Observable<boolean> {
    localStorage.clear();
    this.cookieService.delete('open_session');
    return of(true);
  }
}
