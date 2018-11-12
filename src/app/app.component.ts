import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthState } from './auth/index';
import * as fromCore from './core/store';
import * as fromAuth from './auth/store';
import { Subscription } from 'rxjs/Subscription';
import {
  DialogElement,
  ListItemsSingleChoiceComponent,
  ListItemsSingleChoiceData
} from './shared/components/dialogs/list-dialog/list-items-single-choice.component';
import { List } from 'immutable';
import { Team } from './core/models/team';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-layout>
      <app-sidenav [open]="sidenavOpen$ | async" (closeMenu)="closeSidenav()">
        <div>OSM</div>
        <mat-divider></mat-divider>
        <app-nav-item icon="event" hint="Evènements" routerLink="/events" (navigate)="onNavigate()"></app-nav-item>
        <mat-divider></mat-divider>
        <app-nav-item icon="group" hint="Effectif" routerLink="/members" (navigate)="onNavigate()"></app-nav-item>
      </app-sidenav>
      <app-toolbar *ngIf="toolbarVisible$ | async" (toggleMenu)="toggleSidenav()"
                   (showAvailableTeams)="showAvailableTeams()" (logout)="logout()">
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
    this.sidenavOpen$ = this.store.select(fromCore.LayoutState.getShowSidenav);
    this.isLoggedIn$ = this.store.select(AuthState.isLogged);
    this.toolbarVisible$ = this.isLoggedIn$;
    this.selectedTeam$ = this.store.select(fromCore.TeamsState.getSelectedTeam);
    this.loggedSub = this.isLoggedIn$.subscribe(logged => {
      if (logged) {
        this.store.dispatch(new fromCore.LoadTeams());
      }
    });
    this.teamSub = this.store
      .select(state => fromCore.TeamsState.getAllTeams(state.teamsState))
      .subscribe(teams => {
        this.teams = List(teams);
      });
  }

  toggleSidenav() {
    this.sidenavOpen$
      .pipe(take(1))
      .subscribe(open => (open ? this.closeSidenav() : this.openSidenav()));
  }

  onNavigate() {
    this.closeSidenav();
  }

  closeSidenav() {
    this.store.dispatch(new fromCore.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new fromCore.OpenSidenav());
  }

  logout() {
    this.store.dispatch(new fromAuth.Logout());
  }

  showAvailableTeams() {
    const data = {
      title: 'Sélectionne ton équipe',
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
        this.store.dispatch(new fromCore.SelectTeam(result.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
    this.teamSub.unsubscribe();
  }
}
