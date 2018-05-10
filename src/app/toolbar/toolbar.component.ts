import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {AppSettings} from '../app-settings';
import {TeamService} from '../team.service';
import {UserService} from '../user.service';
import {MatDrawer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  title = 'OSM';
  isLoggedIn: boolean;
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  @Input() navDrawer: MatDrawer;

  availableTeams: Team[];

  loggedInSubscription: Subscription;
  teamsSubscription: Subscription;


  constructor(private userService: UserService,
              private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.loggedInSubscription = this.userService.isLoggedIn.subscribe(logged => {
      // Only retrieve teams when the logged status is changing from false to true
      if (this.isLoggedIn === false && logged) {
        this.getTeams();
      }
      this.isLoggedIn = logged;
    });
    this.firstName$ = this.userService.userFirstName$;
    this.lastName$ = this.userService.userLastName$;
  }

  getTeams() {
    this.teamsSubscription = this.teamService.getTeams().subscribe(teams => {
      this.availableTeams = teams;
      const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
      if (selectedTeamId === null && this.availableTeams.length === 1) {
        this.chooseTeam(this.availableTeams[0]);
      } else {
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

  ngOnDestroy() {
    if (this.loggedInSubscription !== undefined) {
      this.loggedInSubscription.unsubscribe();
    }
    if (this.teamsSubscription !== undefined) {
      this.teamsSubscription.unsubscribe();
    }
  }
}
