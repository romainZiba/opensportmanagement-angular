import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import {AppSettings} from '../app-settings';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../model/user';
import {TeamService} from './team.service';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private teamService: TeamService) {
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
    return this.http.get<User>('/accounts/me', { observe: 'response', withCredentials: true })
      .flatMap((response) => {
        this.loggedIn.next(true);
        localStorage.setItem(AppSettings.currentUsernameKey, response.body['username']);
        this.userSource.next(response.body);
        return of(response);
      }).catch((error) => {
        this.loggedIn.next(false);
        return of(error);
      });
  }

  updateUser(firstName: string,
             lastName: string,
             phoneNumber: string,
             email: string,
             teamId: number,
             licenceNumber: string): Promise<boolean> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    console.log(`Update user, licenceNumber is ${licenceNumber}`);
    return new Promise(resolve => {
      const subscription = this.http.put<User>(`accounts/me`, user, { withCredentials: true })
        .subscribe(updatedUser => {
          if (updatedUser !== null) {
            this.userSource.next(updatedUser);
            this.teamService.updateTeamMember(teamId, licenceNumber).then(() => resolve(true), () => resolve(false));
          }
          resolve(false);
        });
      setTimeout(function() { subscription.unsubscribe(); }, 5000);
    });
  }

  confirmAccount(confirmationId: string,
                 password: string): Promise<boolean> {
    const confirmationBody = {
      confirmationId: confirmationId,
      password: password
    };
    return new Promise(resolve => {
      const subscription = this.http.put<User>(`accounts/confirmation`, confirmationBody)
        .subscribe(updatedUser => updatedUser === null ? resolve(false) : resolve(true));
      setTimeout(function() { subscription.unsubscribe(); }, 5000);
    });
  }
}
