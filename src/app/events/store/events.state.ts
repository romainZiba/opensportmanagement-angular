import { NgxsEntityAdapter } from './../../core/store/entity/ngxs-entity.adapter';
import { FORMAT_DATE } from './../../ui/date-selection/validators/date-validator';
import { NgxsEntityStateModel } from './../../core/store/entity/ngxs-entity.state.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EventService } from '../services/event.service';
import * as eventActions from './events.actions';
import { LoadEvents, LoadEventsSuccess } from './events.actions';
import { catchError, map } from 'rxjs/operators';
import { Event, EventType } from '../models/event';
import * as moment from 'moment';

export class EventStateModel extends NgxsEntityStateModel<Event> {
  loading: boolean;
  loaded: boolean;
  eventForm: {
    model: {
      name: string;
      fromDate: string;
      toDate: string;
      fromTime: string;
      toTime: string;
      placeId?: number;
      isRecurrent: boolean;
      recurrenceDays?: string[];
      opponentId?: number;
      championshipId?: number;
      type: EventType;
    };
    dirty: boolean;
    status: string;
    errors: any;
  };
}

@State<EventStateModel>({
  name: 'events',
  defaults: {
    ...EventStateModel.initialState(),
    loaded: false,
    loading: false,
    eventForm: {
      model: {
        name: '',
        fromDate: moment().format(FORMAT_DATE),
        toDate: moment().format(FORMAT_DATE),
        fromTime: '20:00',
        toTime: '22:30',
        placeId: null,
        isRecurrent: false,
        type: EventType.MATCH
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class EventsState {
  constructor(private eventService: EventService) {}

  @Selector()
  static getEventEntities(state: EventStateModel) {
    return state.entities;
  }

  @Selector()
  static getSelected(state: EventStateModel) {
    return state.selected;
  }

  @Selector()
  static getIds(state: EventStateModel) {
    return state.ids;
  }

  @Selector()
  static isLoading(state: EventStateModel) {
    return state.loading;
  }

  @Selector()
  static isLoaded(state: EventStateModel) {
    return state.loaded;
  }

  @Selector()
  static getAllEvents(state: EventStateModel) {
    return NgxsEntityAdapter.getItemsFromEntities(state.entities);
  }

  @Action(LoadEvents)
  loadEvents({ patchState, dispatch }: StateContext<EventStateModel>, { payload }: LoadEvents) {
    patchState({
      loading: true
    });
    return this.eventService
      .getEvents(payload.teamId, payload.page, payload.size, payload.retrieveAll)
      .pipe(
        map(dtos => {
          const events = dtos.page.totalPages > 0 ? dtos._embedded.eventDtoes : [];
          dispatch(new eventActions.LoadEventsSuccess(events));
        }),
        catchError(error => dispatch(new eventActions.LoadEventsFailed(error)))
      );
  }

  @Action(LoadEventsSuccess)
  loadEventsSuccess(
    ctx: StateContext<EventStateModel>,
    { payload }: eventActions.LoadEventsSuccess
  ) {
    NgxsEntityAdapter.addAll(payload, ctx, '_id');
    ctx.patchState({
      loaded: true,
      loading: false
    });
  }
}
