import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Team} from './model/team';
import {Event} from './model/event';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('/teams', { withCredentials: true });
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true });
  }
}
