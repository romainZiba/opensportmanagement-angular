import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {TeamService} from '../services/team.service';
import {UserService} from '../services/user.service';
import {MatDrawer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';
import {AppSettings} from '../app-settings';

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

  availableTeams$: Observable<List<Team>>;

  selectedTeam$: Observable<Team>;

  subscriptions = new Subscription();
  displayMenu = true;


  constructor(private userService: UserService,
              private teamService: TeamService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.firstName$ = this.userService.userFirstName$;
    this.lastName$ = this.userService.userLastName$;
    this.selectedTeam$ = this.teamService.selectedTeam$;
    this.availableTeams$ = this.teamService.teams$;

    this.subscriptions.add(
      this.userService.isLoggedIn.subscribe(logged => {
        // Only retrieve teams when the logged status is changing from false to true
        if (this.isLoggedIn === false && logged) {
          this.teamService.getTeams();
        }
        this.isLoggedIn = logged;
      })
    );

    this.subscriptions.add(this.availableTeams$
      .subscribe(teams => {
        const selectedTeamId = localStorage.getItem(AppSettings.currentTeamIdKey);
        if (!teams.isEmpty()) {
          selectedTeamId === null ? this.chooseTeam(teams.first()) : this.chooseTeam(
            teams.find(value => value._id.toString() === selectedTeamId));
        }
      })
    );

    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.displayMenu = event.url === '/event-list';
        }
      })
    );
  }

  goBack() {
    this.location.back();
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

  createTeam() {
    this.router.navigate(['/new-team']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
