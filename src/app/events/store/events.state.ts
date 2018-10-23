import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { NgxsEntityAdapter, NgxsEntityStateModel } from "../../shared/entity";
import { EventService } from "../services/event.service";
import * as eventActions from "./events.actions";
import { LoadEvents, LoadEventsSuccess } from "./events.actions";
import { asapScheduler, of } from "rxjs/index";
import { catchError, map } from "rxjs/operators";

import { Event } from "../models/event";

export class EventStateModel extends NgxsEntityStateModel<Event> {
  loading: boolean;
  loaded: boolean;
}

@State<EventStateModel>({
  name: "events",
  defaults: {
    ...EventStateModel.initialState(),
    loaded: false,
    loading: false
  }
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
    return NgxsEntityAdapter.getItemsFromEntities(state.entities);
  }

  @Action(LoadEvents)
  loadEvents(
    { patchState, dispatch }: StateContext<EventStateModel>,
    { payload }: LoadEvents
  ) {
    patchState({
      loading: true
    });
    return this.eventService
      .getEvents(
        payload.teamId,
        payload.page,
        payload.size,
        payload.retrieveAll
      )
      .pipe(
        map(
          dtos =>
            asapScheduler.schedule(() => {
              const events =
                dtos.page.totalPages > 0 ? dtos._embedded.eventDtoes : [];
              dispatch(new eventActions.LoadEventsSuccess(events));
            }),
          catchError(error =>
            of(
              asapScheduler.schedule(() =>
                dispatch(new eventActions.LoadEventsFailed(error))
              )
            )
          )
        )
      );
  }

  @Action(LoadEventsSuccess)
  loadEventsSuccess(
    ctx: StateContext<EventStateModel>,
    { payload }: eventActions.LoadEventsSuccess
  ) {
    NgxsEntityAdapter.addAll(payload, ctx, "_id");
    ctx.patchState({
      loaded: true,
      loading: false
    });
  }
}
