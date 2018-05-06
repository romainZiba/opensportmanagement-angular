import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../model/event';
import {Team} from '../model/team';
import {TeamService} from '../team.service';
import {AppSettings} from '../app-settings';
import {Router} from '@angular/router';
import {speedDialAnimation} from '../speed-dial';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [speedDialAnimation]
})
export class DashboardComponent implements OnInit {
  teams: Team[];
  events: Event[];
  selectedTeam: Team;
  presence = Presence;
  currentPage = 0;
  totalElements: number;
  pageSize = 25;

  options = [
    { label: 'New training', icon: 'far fa-calendar-alt' },
    { label: 'New match', icon: 'fas fa-basketball-ball' },
    { label: 'New event', icon: 'fas fa-beer' },
  ];

  hasLabels = true;

  constructor(private eventService: EventService,
              private teamService: TeamService,
              private router: Router) { }

  isUserPresent(event: Event): Presence {
    const currentUsername = localStorage.getItem(AppSettings.currentUsernameKey);
    if (event.presentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Present;
    } else if (event.absentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Absent;
    }
    return Presence.Unknown;
  }

  ngOnInit() {
    this.teamService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
        const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
        if (selectedTeamId !== null) {
          this.selectedTeam = this.teams.find(value => value._id.toString() === selectedTeamId);
          if (this.selectedTeam !== undefined) {
            this.loadEvents();
          }
        }
      });
  }

  changeTeam() {
    this.currentPage = 0;
    this.loadEvents();
    // Store the selected team
    localStorage.setItem(AppSettings.currentTeamIdKey, this.selectedTeam._id.toString());
  }

  loadEvents(page = this.currentPage, size = this.pageSize) {
    this.eventService.getEvents(this.selectedTeam._id,  page, size).subscribe(response => {
      this.totalElements = response['page']['totalElements'];
      this.currentPage = response['page']['number'];
      this.pageSize = response['page']['size'];
      if (this.totalElements > 0) {
        this.events = response['_embedded']['eventDtoes'];
      } else {
        this.events = [];
      }
    });
  }

  participate(matchId: number, isParticipating: boolean) {
    this.teamService.participate(matchId, isParticipating).subscribe(event => {
      const index = this.events.map(e => e._id).indexOf(event._id);
      this.events[index] = event;
    });
  }

  showDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]);
  }
}

enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
