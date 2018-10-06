import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {EventService} from '../services/event.service';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {PageEvent} from '../components/event-list/event-list.component';
import {Router} from '@angular/router';
import {BaseComponent} from './base.container';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: "app-event-list",
  template: `<event-list [events]="events$ | async"
                         [selectedTeam]="selectedTeam$ | async"
                         [teamMember]="teamMember$ | async"
                         [page]="currentPage$ | async"
                         [pageSize]="pageSize$ | async"
                         [totalElements]="totalElements$ | async"
                         [allEvents]="retrieveAll"
                         (pager)="loadEvents($event)"
                         (details)="showDetails($event)"
                         (eventCreation)="showEventCreationPanel($event)"></event-list>`
})
export class EventListSmartComponent extends BaseComponent
  implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  selectedTeam$: Observable<Team>;
  events$ = this.eventService.events$;
  totalElements$ = this.eventService.totalElements$;
  teamMember$ = this.teamService.currentTeamMember$;
  currentPage$ = this.eventService.currentPage$;
  pageSize$ = this.eventService.pageSize$;
  retrieveAll = false;

  constructor(
    private eventService: EventService,
    private teamService: TeamService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    super(snackbar);
  }

  ngOnInit() {
    this.selectedTeam$ = this.teamService.selectedTeam$.filter(
      team => team !== null
    );
    this._loadEvents(0, 25, this.retrieveAll);
  }

  private _loadEvents(
    currentPage: number,
    pageSize: number,
    retrieveAll: boolean
  ) {
    const sub = this.selectedTeam$
      .map(team =>
        this.eventService.getEvents(
          team._id,
          currentPage,
          pageSize,
          retrieveAll
        )
      )
      .subscribe();
    this.subscriptions.add(sub);
  }

  showDetails(eventId: number) {
    this.router.navigate(["/events", eventId]);
  }

  showEventCreationPanel(url: string) {
    this.router.navigate([`${url}`]);
  }

  loadEvents(pager: PageEvent) {
    this._loadEvents(pager.currentPage, pager.pageSize, pager.retriveAll);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
