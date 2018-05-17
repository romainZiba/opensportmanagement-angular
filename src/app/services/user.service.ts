import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import {AppSettings} from '../app-settings';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../model/user';
import {TeamMember} from '../model/team-member';

@Injectable()
export class UserService {

  private username = new BehaviorSubject<string>('');
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userFirstName = new BehaviorSubject<string>('');
  private userLastName = new BehaviorSubject<string>('');
  private email = new BehaviorSubject<string>('');
  private phoneNumber = new BehaviorSubject<string>('');

  username$ = this.username.asObservable();
  userFirstName$ = this.userFirstName.asObservable();
  userLastName$ = this.userLastName.asObservable();
  email$ = this.email.asObservable();
  phoneNumber$ = this.phoneNumber.asObservable();

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
        this.username.next(response.body['username']);
        this.phoneNumber.next(response.body['phoneNumber']);
        this.email.next(response.body['email']);
        return of(response);
      }).catch((error) => {
        this.loggedIn.next(false);
        return of(error);
      });
  }

  updateUser(firstName: string, lastName: string, phoneNumber: string, email: string): Observable<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    return this.http.put<User>(`users/me`, user, { withCredentials: true });
  }

  updateTeamMember(teamId: number, licenseNumber: string): Observable<TeamMember> {
    const member = new TeamMember();
    member.licenseNumber = licenseNumber;
    return this.http.put<TeamMember>(`teams/${teamId}/members/me`, member, { withCredentials: true });
  }
}
