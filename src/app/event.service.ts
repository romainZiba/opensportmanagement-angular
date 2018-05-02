import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Event} from './model/event';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventService {


  constructor(private http: HttpClient) {
  }

  getEvents(teamId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`/teams/${teamId}/events`, { withCredentials: true });
  }

}
