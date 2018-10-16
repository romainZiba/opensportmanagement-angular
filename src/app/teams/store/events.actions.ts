import { Event } from "../models/event";

export enum EventActionsType {
  LOAD_EVENTS = "[Event] Load Events",
  LOAD_EVENTS_SUCCESS = "[Event] Load events succeeded",
  LOAD_EVENTS_FAILED = "[Event] Load events failed",
  SELECT_EVENT = "[Event] Select event"
}

export class LoadEvents {
  static readonly type = EventActionsType.LOAD_EVENTS;
}

export class LoadEventsSuccess {
  static readonly type = EventActionsType.LOAD_EVENTS_SUCCESS;
  constructor(public payload: Event[]) {}
}

export class LoadEventsFailed {
  static readonly type = EventActionsType.LOAD_EVENTS_FAILED;
  constructor(public payload: any) {}
}

export class SelectEvent {
  static readonly type = EventActionsType.SELECT_EVENT;
  constructor(public payload: number) {}
}

export type EventsActions =
  | LoadEvents
  | LoadEventsSuccess
  | LoadEventsFailed
  | SelectEvent;
