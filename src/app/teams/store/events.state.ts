import {Router} from '@angular/router';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {NgxsEntityAdapter, NgxsEntityStateModel} from '../../shared/entity/index';
import {EventService} from '../services/event.service';
import {LoadEvents} from './events.actions';


export class EventStateModel extends NgxsEntityStateModel<Event> {
  loading: boolean;
  loaded: boolean;
}

@State<EventStateModel>({
  name: 'events',
  defaults: {
    ...EventStateModel.initialState(),
    loaded: false,
    loading: false,
  },
})
export class EventsState {
  constructor(private eventService: EventService, private router: Router) {}

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
    return NgxsEntityAdapter.getItemsFromEntities(this.getEventEntities(state));
  }

  @Action(LoadEvents)
  loadEvents({patchState}: StateContext<EventStateModel>) {
    patchState({
      loading: true
    })
  }
}
