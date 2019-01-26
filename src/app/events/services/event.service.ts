import { Event, EventCreateUpdate } from '../models/event';
import { Observable } from 'rxjs/Observable';
import { EventDtos } from '../models/events-dto';

export abstract class EventService {
  abstract getEvents(
    teamId: number,
    page: number,
    size: number,
    retrieveAll: boolean
  ): Observable<EventDtos>;
  abstract getEvent(id: number): Observable<Event>;
  abstract updateEvent(id: number, event: EventCreateUpdate): Observable<Event>;
  abstract participate(eventId: number, isParticipating: boolean): Observable<Event>;
  abstract cancel(eventId: number): Observable<Event>;
  abstract sendReminder(eventId: number): Observable<Event>;
  abstract openRegistration(eventId: number): Observable<Event>;
}
