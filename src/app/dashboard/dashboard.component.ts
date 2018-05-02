import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../model/event';
import {Team} from '../model/team';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teams: Team[];
  events: Event[];
  selectedTeam: Team;

  constructor(private eventService: EventService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
        const selectedTeamId = localStorage.getItem('selectedTeamId');
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
    localStorage.setItem('selectedTeamId', this.selectedTeam._id.toString());
  }

  loadEvents() {
    this.eventService.getEvents(this.selectedTeam._id).subscribe(events => this.events = events);
  }
}
