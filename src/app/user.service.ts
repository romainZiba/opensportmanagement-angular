import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import {AppSettings} from './app-settings';

@Injectable()
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http
      .post('/login', {username, password}, { observe: 'response', withCredentials: true })
      .flatMap((response) => {
        localStorage.setItem(AppSettings.currentUsernameKey, username);
        this.loggedIn.next(true);
        return of(response);
      }).catch((error) => {
        this.loggedIn.next(false);
        return of(error);
      });
  }

  whoAmI(): Observable<HttpResponse<any>> {
    return this.http.get('/users/me', { observe: 'response', withCredentials: true })
      .flatMap((response) => {
        this.loggedIn.next(true);
        localStorage.setItem(AppSettings.currentUserFirstNameKey, response.body['firstName']);
        localStorage.setItem(AppSettings.currentUserLastNameKey, response.body['lastName']);
        return of(response);
      }).catch((error) => {
        this.loggedIn.next(false);
        return of(error);
      });
  }
}
