import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpResponse } from '@angular/common/http';

export abstract class AuthService {
  abstract authenticate(username: string, password: string): Observable<HttpResponse<any>>;
  abstract whoAmI(): Observable<User>;
  abstract logOut(): Observable<boolean>;
}
