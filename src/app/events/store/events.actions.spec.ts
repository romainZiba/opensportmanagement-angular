import * as fromActions from "./events.actions";
import { Event } from "../models/event";

describe("Events Actions", () => {
  describe("Load Events", () => {
    it("should create an action", () => {
      const action = new fromActions.LoadEvents();
      expect(fromActions.LoadEvents.type).toBe(
        fromActions.EventActionsType.LOAD_EVENTS
      );
      expect({ ...action }).toEqual({});
    });
  });

  describe("Load Events Success", () => {
    it("should create an action", () => {
      const event: Event = {
        name: "Event #1",
        _id: 1,
        fromDateTime: "",
        toDateTime: "",
        placeId: 1,
        placeName: "Place #1",
        presentMembers: [],
        absentMembers: [],
        waitingMembers: [],
        cancelled: false,
        openForRegistration: true
      };
      const events = [event];
      expect(fromActions.LoadEventsSuccess.type).toBe(
        fromActions.EventActionsType.LOAD_EVENTS_SUCCESS
      );
      const action = new fromActions.LoadEventsSuccess(events);
      expect({ ...action }).toEqual({
        payload: events
      });
    });
  });

  describe("Load Events Failed", () => {
    it("should create an action", () => {
      const error = "error";
      const action = new fromActions.LoadEventsFailed(error);
      expect(fromActions.LoadEventsFailed.type).toBe(
        fromActions.EventActionsType.LOAD_EVENTS_FAILED
      );
      expect({ ...action }).toEqual({
        payload: error
      });
    });
  });

  describe("Select Event", () => {
    it("should create an action", () => {
      const id = 1;
      expect(fromActions.SelectEvent.type).toBe(
        fromActions.EventActionsType.SELECT_EVENT
      );
      const action = new fromActions.SelectEvent(id);
      expect({ ...action }).toEqual({
        payload: id
      });
    });
  });
});
