import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { LoadEvents, LoadEventsSuccess } from './events.actions';
import { of } from 'rxjs/observable/of';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventsState, EventStateModel } from './events.state';
import { RouterTestingModule } from '@angular/router/testing';
import { EventDtos } from '../models/events-dto';

// Return a fixed timestamp when moment().format() is called
jest.mock('moment', () => () => ({ format: () => '2018–11–03' }));

describe('Events', () => {
  let store: Store;
  let service: EventService;

  const event1: Event = {
    _id: 1,
    name: 'Event #1',
    fromDateTime: '',
    toDateTime: '',
    placeId: 1,
    placeName: 'place',
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: false,
    teamId: 1
  };

  const event2: Event = {
    _id: 2,
    name: 'Event #2',
    fromDateTime: '',
    toDateTime: '',
    placeId: 1,
    placeName: 'place',
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: false,
    teamId: 1
  };

  const events: Event[] = [event1, event2];
  const eventEntities = {
    1: event1,
    2: event2
  };

  const dtos: EventDtos = {
    _embedded: [],
    _links: [],
    page: 1
  };

  const selected = event1._id;
  const eventsState: EventStateModel = {
    entities: eventEntities,
    selected,
    ids: events.map(event => event._id),
    loaded: true,
    loading: false
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([EventsState])],
      providers: [EventService]
    });

    service = TestBed.get(EventService);
    store = TestBed.get(Store);

    spyOn(service, 'getEvents').and.returnValue(of(dtos));
  });

  describe('Selector', () => {
    it('should select events entities', () => {
      expect(EventsState.getEventEntities(eventsState)).toEqual(eventEntities);
    });

    it('should select all events', () => {
      expect(EventsState.getAllEvents(eventsState)).toEqual(events);
    });

    it('should select all ids', () => {
      expect(EventsState.getIds(eventsState)).toEqual(events.map(e => e._id));
    });

    it('should select the selected event', () => {
      expect(EventsState.getSelected(eventsState)).toEqual(event1._id);
    });

    it('should tell if events are loading', () => {
      expect(EventsState.isLoading(eventsState)).toEqual(false);
    });

    it('should tell if events are loaded', () => {
      expect(EventsState.isLoaded(eventsState)).toEqual(true);
    });
  });

  describe('Actions', function() {
    describe('Load events', function() {
      it('should change loading to true', async(() => {
        const eventsQuery = { teamId: 1, page: 0, size: 20, retrieveAll: true };
        store.dispatch(new LoadEvents(eventsQuery));
        store.selectOnce(state => state.events.loading).subscribe(loading => {
          expect(loading).toBe(true);
        });
        expect(service.getEvents).toHaveBeenCalledWith(
          eventsQuery.teamId,
          eventsQuery.page,
          eventsQuery.size,
          eventsQuery.retrieveAll
        );
      }));
    });

    describe('Load events success', function() {
      it('should change state to reflect events loaded', async(() => {
        store.dispatch(new LoadEventsSuccess(events));
        store.selectOnce(state => state.events).subscribe(state => {
          expect(state).toMatchSnapshot();
        });
      }));
    });
  });
});
