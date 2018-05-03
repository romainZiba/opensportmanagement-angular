import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../model/event';
import {Team} from '../model/team';
import {TeamService} from '../team.service';
import {AppSettings} from '../app-settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teams: Team[];
  events: Event[];
  selectedTeam: Team;
  presence = Presence;

  constructor(private eventService: EventService,
              private teamService: TeamService) { }

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
    this.loadEvents()
    // Store the selected team
    localStorage.setItem(AppSettings.currentTeamIdKey, this.selectedTeam._id.toString());
  }

  loadEvents() {
    this.eventService.getEvents(this.selectedTeam._id).subscribe(events => this.events = events);
  }

  isUserPresent(event: Event): Presence {
    const currentUsername = localStorage.getItem(AppSettings.currentUsernameKey);
    if (event.presentMembers.indexOf(currentUsername) > -1) {
      return Presence.Present;
    } else if (event.absentMembers.indexOf(currentUsername) > -1) {
      return Presence.Absent;
    }
    return Presence.Unknown;
  }

  participate(matchId: number, isParticipating: boolean) {
    this.teamService.participate(matchId, isParticipating).subscribe(event => {
      const index = this.events.map(e => e._id).indexOf(event._id);
      this.events[index] = event;
    });
  }
}

enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
