import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Event} from '../model/event';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppMessage} from '../model/AppMessage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {List} from 'immutable';

@Injectable()
export class EventService {
  private eventsSource = new BehaviorSubject<List<Event>>(List());
  private eventSource = new BehaviorSubject<Event>(null);
  private currentPageSource = new BehaviorSubject(0);
  private pageSizeSource = new BehaviorSubject(25);
  private totalElementsSource = new BehaviorSubject(0);

  readonly events$ = this.eventsSource.asObservable();
  readonly currentPage$ = this.currentPageSource.asObservable();
  readonly pageSize$ = this.pageSizeSource.asObservable();
  readonly totalElements$ = this.totalElementsSource.asObservable();
  readonly event$ = this.eventSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getEvents(teamId: number, page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    const subscription = this.http.get(`/teams/${teamId}/events`, { withCredentials: true, params: params})
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
      })
      .subscribe(events => this.eventsSource.next(events));
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  getEvent(id: number) {
    this.http.get<Event>(`/events/${id}`, { withCredentials: true })
      .subscribe(event => this.eventSource.next(event));
  }

  getMessages(eventId: string) {
    return this.http.get<AppMessage[]>(`/events/${eventId}/messages`, { withCredentials: true });
  }

  postMessage(eventId: string, body: string) {
    const message = new AppMessage();
    message.body = body;
    const subscription = this.http.post<AppMessage>(`/events/${eventId}/messages`, message,{ withCredentials: true })
      .subscribe();
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  participate(eventId: number, isParticipating: boolean): Promise<boolean> {
    return new Promise(resolve => {
      this.http.put<Event>(`/events/${eventId}/${isParticipating}`, '', { withCredentials: true })
        .subscribe(event => {
          const events = this.eventsSource.value;
          const index = events.findIndex(value => value._id === event._id);
          events[index] = event;
          this.eventsSource.next(events);
          this.eventSource.next(event);
          resolve(true);
        }, () => resolve(false));
    });
  }
}
