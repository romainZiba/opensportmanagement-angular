import { Injectable } from '@angular/core';

import { Event, EventCreateUpdate } from '../models/event';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { EventDtos } from '../models/events-dto';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(
    teamId: number,
    page: number,
    size: number,
    retrieveAll: boolean
  ): Observable<EventDtos> {
    let params = new HttpParams().append('page', page.toString()).append('size', size.toString());
    if (!retrieveAll) {
      params = params.append('date', moment().toISOString());
    }
    return this.http.get<EventDtos>(`/teams/${teamId}/events`, {
      withCredentials: true,
      params: params
    });
  }

  getEvent(id: number) {
    this.http.get<Event>(`/events/${id}`, { withCredentials: true });
  }

  updateEvent(id: number, event: EventCreateUpdate): Observable<Event> {
    return this.http.put<Event>(`/events/${id}`, event, {
      withCredentials: true
    });
  }

  participate(eventId: number, isParticipating: boolean): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', {
      withCredentials: true
    });
  }

  cancel(eventId: number): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/cancelled`, '', {
      withCredentials: true
    });
  }

  sendReminder(eventId: number): Observable<Event> {
    return this.http.post<Event>(`/events/${eventId}/notifications`, '', {
      withCredentials: true
    });
  }

  openRegistration(eventId: number): Observable<Event> {
    return this.http.put<Event>(`/events/${eventId}/registrations`, '', {
      withCredentials: true
    });
  }
}
