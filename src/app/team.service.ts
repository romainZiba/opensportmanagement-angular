import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Team} from './model/team';
import {Event} from './model/event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppSettings} from './app-settings';
import {TeamMember} from './model/team-member';

@Injectable()
export class TeamService {

  private selectedTeamSource = new BehaviorSubject<Team>(null);
  private currentTeamMemberSource =  new BehaviorSubject<TeamMember>(null);

  teams$: Observable<Team[]>;
  selectedTeam$ = this.selectedTeamSource.asObservable();
  currentTeamMember$ = this.currentTeamMemberSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    this.teams$ = this.http.get<Team[]>('/teams', { withCredentials: true });
    return this.teams$;
  }

  selectTeam(team: Team) {
    localStorage.setItem(AppSettings.currentTeamIdKey, team._id.toString());
    this.selectedTeamSource.next(team);
    this.http.get<TeamMember>(`/teams/${team._id}/members/me`, { withCredentials: true })
      .subscribe(member => {
        this.currentTeamMemberSource.next(member);
      });
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true });
  }
}
