import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {AppSettings} from '../app-settings';
import {TeamService} from '../team.service';
import {UserService} from '../user.service';
import {MatDrawer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title = 'Opensportmanagement';
  isLoggedIn: boolean;
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  @Input() navDrawer: MatDrawer;

  availableTeams: Team[];

  constructor(private userService: UserService,
              private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
      if (logged) {
        this.getTeams();
      }
    });
    this.firstName$ = this.userService.userFirstName$;
    this.lastName$ = this.userService.userLastName$;
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.availableTeams = teams;
      if (this.availableTeams.length === 1) {
        this.chooseTeam(this.availableTeams[0]);
      } else {
        const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
        if (selectedTeamId !== null) {
          this.chooseTeam(this.availableTeams.find(value => value._id.toString() === selectedTeamId));
        }
      }
    });
  }

  chooseTeam(team: Team) {
    this.teamService.selectTeam(team);
  }

  logOut() {
    this.userService.logOut();
  }

  showUserDetails() {
    this.router.navigate(['/user-details']);
  }
}
