import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { Select, Store } from '@ngxs/store';
import { EventsState, LoadEvents } from '../../store';
import { TeamsState } from '../../../core/store';
import { EventsQuery } from '../../models/events-query';
import { Observable } from 'rxjs/Observable';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-events',
  template: `
    <app-event-list [events]="events$ | async" (eventCreation)="newEvent()"></app-event-list>
  `
})
export class EventsPageComponent implements OnInit {
  @Select(EventsState.getAllEvents)
  events$: Observable<Event[]>;

  constructor(private store: Store) {}

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

  newEvent() {
    this.store.dispatch(new Navigate(['/new-event']));
  }
}
