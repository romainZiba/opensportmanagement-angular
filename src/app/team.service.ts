import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Team} from './model/team';
import {Event} from './model/event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TeamService {

  private selectedTeamSource = new BehaviorSubject<Team>(null);

  teams$: Observable<Team[]>;
  selectedTeam$ = this.selectedTeamSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    this.teams$ = this.http.get<Team[]>('/teams', { withCredentials: true });
    return this.teams$;
  }

  selectTeam(team: Team) {
    this.selectedTeamSource.next(team);
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true });
  }
}
