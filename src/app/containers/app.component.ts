import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromAuth from "../auth/index";
import * as fromStore from "../core/store/index";
import { Team } from "../model/team";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  template: `
    <app-layout>
      <app-sidenav [open]="sidenavOpen$ | async" (closeMenu)="closeSidenav()">
        <img alt="Open Sport Management" src="../assets/img/logo.png" class="mt-4 ml-4 center">
      </app-sidenav>
      <app-toolbar *ngIf="toolbarVisible$ | async" (openMenu)="openSidenav()">
        {{ selectedTeam$ | async }}
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

  constructor(private store: Store<fromStore.CoreState>) {}

  ngOnInit(): void {
    this.sidenavOpen$ = this.store.pipe(select(fromStore.getShowSidenav));
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.toolbarVisible$ = this.isLoggedIn$;
    this.selectedTeam$ = this.store.pipe(select(fromStore.getSelectedTeam));
    this.loggedSub = this.isLoggedIn$.subscribe(logged => {
      if (logged) {
        this.store.dispatch(new fromStore.LoadTeams());
      }
    });
  }

  closeSidenav() {
    this.store.dispatch(new fromStore.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new fromStore.OpenSidenav());
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
  }
}
