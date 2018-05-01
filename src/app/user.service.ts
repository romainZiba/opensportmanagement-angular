import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Credentials } from './model/credentials';

@Injectable()
export class UserService {

  private loginUrl = 'https://yourOpenSportManagementServer/login';  // URL to web api

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http
      .post(this.loginUrl, {username, password}, { observe: 'response' })
  }
}
