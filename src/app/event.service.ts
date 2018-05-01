import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Event } from './model/event';
import { EVENTS } from './mock-events';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return of(EVENTS);
  }

}
