import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromAuth from "../auth/index";
import * as fromStore from "../core/store/index";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  template: `
    <app-layout>
      <app-sidenav [open]="sidenavOpen$ | async" (closeMenu)="closeSidenav()">
        <img alt="Open Sport Management" src="../assets/img/logo.png" class="mt-4 ml-4 center">
      </app-sidenav>
      <app-toolbar *ngIf="toolbarVisible$ | async" (openMenu)="openSidenav()">
      </app-toolbar>
      <div class="inner-sidenav-content">
        <router-outlet></router-outlet>
      </div>
    </app-layout>
  `
})
export class AppComponent implements OnInit {
  sidenavOpen$: Observable<boolean>;
  toolbarVisible$: Observable<boolean>;

  constructor(private store: Store<fromStore.CoreState>) {}

  ngOnInit(): void {
    this.sidenavOpen$ = this.store.pipe(select(fromStore.getShowSidenav));

    this.toolbarVisible$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    this.store.dispatch(new fromStore.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new fromStore.OpenSidenav());
  }
}
