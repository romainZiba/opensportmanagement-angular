import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {User} from '../../model/user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  authenticate(
    username: string,
    password: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      "/login",
      { username, password },
      { observe: "response", withCredentials: true }
    );
  }

  whoAmI(): Observable<User> {
    return this.http.get<User>("/accounts/me", {
      withCredentials: true
    });
  }

  logOut(): Observable<boolean> {
    localStorage.clear();
    this.cookieService.delete("open_session");
    return of(true);
  }
}