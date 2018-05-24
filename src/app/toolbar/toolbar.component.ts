import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {AppSettings} from '../app-settings';
import {TeamService} from '../services/team.service';
import {UserService} from '../services/user.service';
import {MatDrawer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
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
  selectedTeam$: Observable<Team>;

  subscriptions = new Subscription();
  displayMenu = true;


  constructor(private userService: UserService,
              private teamService: TeamService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.subscriptions.add(
      this.userService.isLoggedIn.subscribe(logged => {
        // Only retrieve teams when the logged status is changing from false to true
        if (this.isLoggedIn === false && logged) {
          this.getTeams();
        }
        this.isLoggedIn = logged;
      })
    );
    this.firstName$ = this.userService.userFirstName$;
    this.lastName$ = this.userService.userLastName$;
    this.selectedTeam$ = this.teamService.selectedTeam$;

    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/event-list') {
            this.displayMenu = true;
          } else {
            this.displayMenu = false;
          }
        }
      })
    );
  }

  goBack() {
    this.location.back();
  }


  getTeams() {
    this.subscriptions.add(
      this.teamService.getTeams().subscribe(teams => {
        this.availableTeams = teams;
        const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
        if (selectedTeamId === null && this.availableTeams.length > 0) {
          this.chooseTeam(this.availableTeams[0]);
        } else {
          if (selectedTeamId !== null) {
            this.chooseTeam(this.availableTeams.find(value => value._id.toString() === selectedTeamId));
          }
        }
      })
    );
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
    this.subscriptions.unsubscribe();
  }
}
