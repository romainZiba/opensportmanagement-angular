import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {Event, EventCreation} from '../model/event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppSettings} from '../app-settings';
import {TeamMember} from '../model/team-member';
import {List} from 'immutable';

@Injectable()
export class TeamService {

  private teamsSource =  new BehaviorSubject<List<Team>>(List());
  private teamMembersSource =  new BehaviorSubject<List<TeamMember>>(List());
  private selectedTeamSource = new BehaviorSubject<Team>(null);
  private currentTeamMemberSource =  new BehaviorSubject<TeamMember>(null);

  readonly teams$ = this.teamsSource.asObservable();
  readonly teamMembers$ = this.teamMembersSource.asObservable();
  readonly selectedTeam$ = this.selectedTeamSource.asObservable();
  readonly currentTeamMember$ = this.currentTeamMemberSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getTeams() {
    const subscription = this.http.get<Team[]>('/teams', { withCredentials: true })
      .subscribe(teams => this.teamsSource.next(List(teams)));
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  getTeamMembers(teamId: number) {
    const subscription = this.http.get<TeamMember[]>(`/teams/${teamId}/members`, { withCredentials: true })
      .subscribe(teamMembers => this.teamMembersSource.next(List(teamMembers)));
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  selectTeam(team: Team) {
    localStorage.setItem(AppSettings.currentTeamIdKey, team._id.toString());
    this.selectedTeamSource.next(team);
    // TODO: this method should not be responsible of getting the team members
    const subscription = this.http.get<TeamMember>(`/teams/${team._id}/members/me`, { withCredentials: true })
      .subscribe(member => {
        this.currentTeamMemberSource.next(member);
      });
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true });
  }

  createEvent(teamId: number, event: EventCreation): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http.post(`/teams/${teamId}/events`, event, { observe: 'response', withCredentials: true })
        .subscribe(createdEvent => {
          resolve(true);
        }, error => error(false));
      setTimeout(function() { subscription.unsubscribe(); }, 5000);
    });
  }

  createTeam(name: string, sport: string): Promise<boolean> {
    const team = new Team();
    team.name = name;
    team.sport = sport;
    team.genderKind = 'MALE';
    team.ageGroup = 'ADULTS';
    return new Promise(resolve => {
      const subscription = this.http.post<Team>(`/teams`, team, { withCredentials: true })
        .subscribe(createdTeam => {
          this.teamsSource.next(this.teamsSource.getValue().push(createdTeam));
          resolve(true);
        }, error => error(false));
      setTimeout(function() { subscription.unsubscribe(); }, 5000);
    });
  }
}
