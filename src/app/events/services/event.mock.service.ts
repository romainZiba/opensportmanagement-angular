import { Injectable } from '@angular/core';

import { Event, EventCreateUpdate } from '../models/event';
import { Observable } from 'rxjs/Observable';
import { EventDtos } from '../models/events-dto';
import { EventService } from './event.service';
import { EVENTS_MOCK } from '../mocks/events.mock';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventMockService extends EventService {
  getEvents(teamId: number, page: number, size: number): Observable<EventDtos> {
    if (teamId !== null && page !== null && size !== null) {
      return of(EVENTS_MOCK[page]);
    }
    return throwError('Error occurred');
  }

  getEvent(id: number): Observable<Event> {
    if (id) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }

  updateEvent(id: number, event: EventCreateUpdate): Observable<Event> {
    if (id && event) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    if (eventId && isParticipating) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }

  cancel(eventId: number): Observable<Event> {
    if (eventId) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }

  sendReminder(eventId: number): Observable<Event> {
    if (eventId) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }

  openRegistration(eventId: number): Observable<Event> {
    if (eventId) {
      // TODO: something else than null
      return of(null);
    }
    return throwError('Not found');
  }
}
