import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {EventCreateUpdate} from '../model/event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppSettings} from '../app-settings';
import {TeamMember} from '../model/team-member';
import {List} from 'immutable';
import {Season} from '../model/season';
import {Championship} from '../model/championship';
import {ChampionshipForm} from '../components/championship-creation/championship-creation.component';
import {of} from 'rxjs/observable/of';

@Injectable()
export class TeamService {
  private teamsSource = new BehaviorSubject<List<Team>>(List());
  private teamMembersSource = new BehaviorSubject<List<TeamMember>>(List());
  private selectedTeamSource = new BehaviorSubject<Team>(null);
  private currentTeamMemberSource = new BehaviorSubject<TeamMember>(null);
  private seasonsSource = new BehaviorSubject<List<Season>>(List());
  private championshipsSource = new BehaviorSubject<List<Championship>>(List());

  readonly teams$ = this.teamsSource.asObservable();
  readonly teamMembers$ = this.teamMembersSource.asObservable();
  readonly selectedTeam$ = this.selectedTeamSource.asObservable();
  readonly currentTeamMember$ = this.currentTeamMemberSource.asObservable();
  readonly seasons$ = this.seasonsSource.asObservable();
  readonly championships$ = this.championshipsSource.asObservable();

  constructor(private http: HttpClient) {}

  getTeams() {
    const subscription = this.http
      .get<Team[]>("/teams", { withCredentials: true })
      .subscribe(teams => this.teamsSource.next(List(teams)));
    setTimeout(function() {
      subscription.unsubscribe();
    }, 5000);
  }

  getTeamMembers(teamId: number) {
    const subscription = this.http
      .get<TeamMember[]>(`/teams/${teamId}/members`, { withCredentials: true })
      .subscribe(teamMembers => this.teamMembersSource.next(List(teamMembers)));
    setTimeout(function() {
      subscription.unsubscribe();
    }, 5000);
  }

  updateTeamMember(teamId: number, licenseNumber: string): Promise<boolean> {
    const member = new TeamMember();
    member.licenceNumber = licenseNumber;
    return new Promise(resolve => {
      const subscription = this.http
        .put<TeamMember>(`teams/${teamId}/members/me`, member, {
          observe: "response",
          withCredentials: true
        })
        .subscribe(
          response => {
            if (response.status === 200) {
              this.currentTeamMemberSource.next(response.body);
            }
            resolve(response.status === 200);
          },
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  getSports(): Observable<List<string>> {
    return of(List(["BASKETBALL", "FOOTBALL", "HANDBALL", "OTHER"]));
  }

  selectTeam(team: Team) {
    localStorage.setItem(AppSettings.currentTeamIdKey, team._id.toString());
    this.selectedTeamSource.next(team);
    // TODO: this method should not be responsible of getting the team members
    const subscription = this.http
      .get<TeamMember>(`/teams/${team._id}/members/me`, {
        withCredentials: true
      })
      .subscribe(member => {
        this.currentTeamMemberSource.next(member);
      });
    setTimeout(function() {
      subscription.unsubscribe();
    }, 5000);
  }

  createEvent(event: EventCreateUpdate): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post(`/teams/${event.teamId}/events`, event, {
          observe: "response",
          withCredentials: true
        })
        .subscribe(
          response => resolve(response.status === 201),
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  createTeam(name: string, sport: string): Promise<boolean> {
    const team = new Team();
    team.name = name;
    team.sport = sport;
    team.genderKind = "MALE";
    team.ageGroup = "ADULTS";
    return new Promise(resolve => {
      const subscription = this.http
        .post<Team>(`/teams`, team, { withCredentials: true })
        .subscribe(
          createdTeam => {
            this.teamsSource.next(
              this.teamsSource.getValue().push(createdTeam)
            );
            resolve(true);
          },
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  createTeamMember(teamId: number, member: TeamMember): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post<TeamMember>(`/teams/${teamId}/members`, member, {
          withCredentials: true
        })
        .subscribe(
          createdMember => {
            this.teamMembersSource.next(
              this.teamMembersSource.getValue().push(createdMember)
            );
            resolve(true);
          },
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  getSeasons(teamId: number): void {
    this.http
      .get<Season[]>(`/teams/${teamId}/seasons`, { withCredentials: true })
      .subscribe(seasons => this.seasonsSource.next(List(seasons)));
  }

  getChampionships(seasonId: number) {
    const subscription = this.http
      .get<Championship[]>(`/seasons/${seasonId}/championships`, {
        withCredentials: true
      })
      .subscribe(ch => this.championshipsSource.next(List(ch)));
    setTimeout(function() {
      subscription.unsubscribe();
    }, 5000);
  }

  createMatch(eventCreation: EventCreateUpdate): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post(
          `/championships/${eventCreation.championshipId}/matches`,
          eventCreation,
          { observe: "response", withCredentials: true }
        )
        .subscribe(
          response => resolve(response.status === 201),
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  createSeason(teamId: number, season: Season): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post<Season>(`/teams/${teamId}/seasons`, season, {
          withCredentials: true
        })
        .subscribe(
          createdSeason => {
            this.seasonsSource.next(
              this.seasonsSource.value.push(createdSeason)
            );
            resolve(true);
          },
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }

  createChampionship(
    championship: ChampionshipForm,
    seasonId: number
  ): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post<Championship>(
          `/seasons/${seasonId}/championships`,
          championship,
          { withCredentials: true }
        )
        .subscribe(
          createdChamp => {
            this.championshipsSource.next(
              this.championshipsSource.value.push(createdChamp)
            );
            resolve(true);
          },
          () => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }
}
