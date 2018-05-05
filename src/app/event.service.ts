import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Event} from './model/event';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class EventService {


  constructor(private http: HttpClient) {
  }

  getEvents(teamId: number, page: number, size: number): Observable<Event[]> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get<Event[]>(`/teams/${teamId}/events`, { withCredentials: true, params: params});
  }

}
