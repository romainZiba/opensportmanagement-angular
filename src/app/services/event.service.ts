import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Event} from '../model/event';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppMessage} from '../model/AppMessage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class EventService {
  private eventsSource = new BehaviorSubject<Object>({});

  readonly events$ = this.eventsSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getEvents(teamId: number, page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    const subscription = this.http.get<Event[]>(`/teams/${teamId}/events`, { withCredentials: true, params: params})
      .subscribe(events => this.eventsSource.next(events));
    setTimeout(function() { subscription.unsubscribe(); }, 5000);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`/events/${id}`, { withCredentials: true });
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
}
