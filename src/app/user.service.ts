import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import {AppSettings} from './app-settings';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userFirstName = new BehaviorSubject<string>('');
  private userLastName = new BehaviorSubject<string>('');

  userFirstName$ = this.userFirstName.asObservable();
  userLastName$ = this.userLastName.asObservable();


  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post('/login', {username, password}, { observe: 'response', withCredentials: true });
  }

  logOut() {
    localStorage.clear();
    this.cookieService.delete('open_session');
    this.router.navigate(['/login']);
    this.loggedIn.next(false);
  }

  whoAmI(): Observable<HttpResponse<any>> {
    return this.http.get('/users/me', { observe: 'response', withCredentials: true })
      .flatMap((response) => {
        this.loggedIn.next(true);
        localStorage.setItem(AppSettings.currentUsernameKey, response.body['username']);
        this.userFirstName.next(response.body['firstName']);
        this.userLastName.next(response.body['lastName']);
        return of(response);
      }).catch((error) => {
        this.loggedIn.next(false);
        return of(error);
      });
  }
}
