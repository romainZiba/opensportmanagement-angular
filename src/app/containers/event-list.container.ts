import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {EventService} from '../services/event.service';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {PageEvent, Participation} from '../components/event-list/event-list.component';
import {List} from 'immutable';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-event-list',
  template: `
    <event-list [events]="events$ | async"
                [selectedTeam]="selectedTeam$ | async"
                [teamMember]="teamMember$ | async"
                [page]="currentPage$ | async"
                [pageSize]="pageSize$ | async"
                [totalElements]="totalElements$ | async"
                (pager)="loadEvents($event)"
                (participation)="participate($event)"
                (details)="showDetails($event)"
                (eventCreation)="showEventCreationPanel($event)"></event-list>
  `,

})
export class EventListSmartComponent implements OnInit, OnDestroy {
  private currentPageSource = new BehaviorSubject(0);
  private pageSizeSource = new BehaviorSubject(25);
  private totalElementsSource = new BehaviorSubject(0);

  subscriptions = new Subscription();
  selectedTeam$: Observable<Team>;
  events$: Observable<List<Event>>;
  totalElements$ = this.totalElementsSource.asObservable();
  teamMember$ = this.teamService.currentTeamMember$;
  currentPage$ = this.currentPageSource.asObservable();
  pageSize$ = this.pageSizeSource.asObservable();

  constructor(private eventService: EventService,
              private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.selectedTeam$ = this.teamService.selectedTeam$
      .filter(team => team !== null);
    this._loadEvents(0, 25);

    this.events$ = this.eventService.events$
      .filter(response => response.hasOwnProperty('page'))
      .flatMap(response => {
        this.currentPageSource.next(response['page']['number']);
        this.pageSizeSource.next(response['page']['size']);
        this.totalElementsSource.next(response['page']['totalElements']);
        if (response['page']['totalElements'] > 0) {
          return Observable.of(response['_embedded']['eventDtoes']);
        } else {
          return Observable.of(List());
        }
      });
  }

  private _loadEvents(currentPage: number, pageSize: number) {
    this.selectedTeam$
      .map(team => this.eventService.getEvents(team._id,  currentPage, pageSize))
      .subscribe();
  }

  showDetails(eventId: number) {
    this.router.navigate(['/events', eventId]);
  }

  showEventCreationPanel(url: string) {
    this.router.navigate([`${url}`]);
  }

  loadEvents(pager: PageEvent) {
    this._loadEvents(pager.currentPage, pager.pageSize);
  }

  participate(event: Participation) {
    this._participate(event.eventId, event.presence);
  }

  _participate(eventId: number, isParticipating: boolean) {
    this.subscriptions.add(this.teamService.participate(eventId, isParticipating).subscribe(event => {
        // TODO: single source of truth, this should modified eventsSource in event service !!!
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
