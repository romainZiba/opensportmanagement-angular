import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { Select, Store } from '@ngxs/store';
import { EventsState, LoadEvents } from '../../store';
import { TeamsState } from '../../../core/store';
import { EventsQuery } from '../../models/events-query';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  template: `
    <mat-list>
      <app-event-item *ngFor="let event of events$ | async as events; let i = index" [event]="event"
                      [lastEvent]="i == events.length - 1"></app-event-item>
    </mat-list>
    <button mat-fab (click)="goToNewEvent()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  @Select(EventsState.getAllEvents)
  events$: Observable<Event[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.select(TeamsState.getSelected).subscribe(selected => {
      if (selected) {
        const eventsQuery = {
          teamId: selected,
          page: 0,
          size: 20,
          retrieveAll: true
        } as EventsQuery;
        this.store.dispatch(new LoadEvents(eventsQuery));
      }
    });
  }

  goToNewEvent() {
    this.router.navigate(['/new-event']);
  }
}
