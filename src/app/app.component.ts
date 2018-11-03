import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthState } from './auth/index';
import * as fromStore from './core/store/index';
import { Subscription } from 'rxjs/Subscription';
import {
  DialogElement,
  ListItemsSingleChoiceComponent,
  ListItemsSingleChoiceData
} from './shared/components/dialogs/list-dialog/list-items-single-choice.component';
import { List } from 'immutable';
import { Team } from './core/models/team';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-layout>
      <app-sidenav [open]="sidenavOpen$ | async" (closeMenu)="closeSidenav()">
        <img alt="Open Sport Management" src="../assets/img/logo.png" class="mt-4 ml-4 center">
      </app-sidenav>
      <app-toolbar *ngIf="toolbarVisible$ | async" (openMenu)="openSidenav()" (showAvailableTeams)="showAvailableTeams()">
        {{ (selectedTeam$ | async)?.name }}
      </app-toolbar>
      <div class="inner-sidenav-content">
        <router-outlet></router-outlet>
      </div>
    </app-layout>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  sidenavOpen$: Observable<boolean>;
  toolbarVisible$: Observable<boolean>;
  selectedTeam$: Observable<Team>;
  isLoggedIn$: Observable<boolean>;
  loggedSub: Subscription;
  teams: List<Team> = List();
  teamSub: Subscription;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sidenavOpen$ = this.store.select(fromStore.LayoutState.getShowSidenav);
    this.isLoggedIn$ = this.store.select(AuthState.isLogged);
    this.toolbarVisible$ = this.isLoggedIn$;
    this.selectedTeam$ = this.store.select(fromStore.TeamsState.getSelectedTeam);
    this.loggedSub = this.isLoggedIn$.subscribe(logged => {
      if (logged) {
        this.store.dispatch(new fromStore.LoadTeams());
      }
    });
    this.teamSub = this.store
      .select(state => fromStore.TeamsState.getAllTeams(state.teamsState))
      .subscribe(teams => {
        this.teams = List(teams);
      });
  }

  closeSidenav() {
    this.store.dispatch(new fromStore.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new fromStore.OpenSidenav());
  }

  showAvailableTeams() {
    const data = {
      title: 'Select your team',
      elements: this.teams.map(team => {
        return { id: team._id, payload: team.name } as DialogElement;
      })
    } as ListItemsSingleChoiceData;
    const dialogRef = this.dialog.open(ListItemsSingleChoiceComponent, {
      width: '600px',
      data
    });
    dialogRef.afterClosed().subscribe((result: DialogElement) => {
      if (result) {
        this.store.dispatch(new fromStore.SelectTeam(result.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
    this.teamSub.unsubscribe();
  }
}
