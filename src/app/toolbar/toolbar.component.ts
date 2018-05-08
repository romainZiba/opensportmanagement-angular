import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {AppSettings} from '../app-settings';
import {TeamService} from '../team.service';
import {UserService} from '../user.service';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title = 'Opensportmanagement';
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  @Input() navDrawer: MatDrawer;

  availableTeams: Team[];
  selectedTeam: Team;

  constructor(private userService: UserService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
      this.firstName = localStorage.getItem(AppSettings.currentUserFirstNameKey);
      this.lastName = localStorage.getItem(AppSettings.currentUserLastNameKey);
    });


    this.teamService.getTeams().subscribe(teams => {
      this.availableTeams = teams;
      const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
      if (selectedTeamId !== null) {
        this.selectedTeam = this.availableTeams.find(value => value._id.toString() === selectedTeamId);
        this.teamService.selectTeam(this.selectedTeam);
      }
    });
  }

  chooseTeam(team: Team) {
    this.selectedTeam = team;
    localStorage.setItem(AppSettings.currentTeamIdKey, this.selectedTeam._id.toString());
    this.teamService.selectTeam(this.selectedTeam);
  }
}
