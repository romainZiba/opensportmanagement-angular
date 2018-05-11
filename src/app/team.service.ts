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
  teamMembers$: Observable<TeamMember[]>;
  selectedTeam$ = this.selectedTeamSource.asObservable();
  currentTeamMember$ = this.currentTeamMemberSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    this.teams$ = this.http.get<Team[]>('/teams', { withCredentials: true });
    return this.teams$;
  }

  getTeamMembers(teamId: number): Observable<TeamMember[]> {
    this.teamMembers$ = this.http.get<TeamMember[]>(`/teams/${teamId}/members`, { withCredentials: true });
    return this.teamMembers$;
  }

  selectTeam(team: Team) {
    localStorage.setItem(AppSettings.currentTeamIdKey, team._id.toString());
    this.selectedTeamSource.next(team);
    const subscription = this.http.get<TeamMember>(`/teams/${team._id}/members/me`, { withCredentials: true })
      .subscribe(member => {
        this.currentTeamMemberSource.next(member);
      });
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true });
  }
}
