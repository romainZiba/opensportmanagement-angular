import { async, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { LoadEvents } from "./events.actions";
import { of } from "rxjs/observable/of";
import { Event } from "../models/event";
import { EventService } from "../services/event.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EventsState } from "./events.state";
import { RouterTestingModule } from "@angular/router/testing";

describe("Events", () => {
  let store: Store;
  let service: EventService;

  const event1: Event = {
    _id: 1,
    name: "Team #1",
    fromDateTime: "",
    toDateTime: "",
    placeId: 1,
    placeName: "place",
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: false
  };

  const events: Event[] = [event1];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([EventsState])
      ],
      providers: [EventService]
    });

    service = TestBed.get(EventService);
    store = TestBed.get(Store);

    spyOn(service, "getEvents").and.returnValue(of(events));
  });

  it("should change loading to true", async(() => {
    store.dispatch(new LoadEvents());
    store.selectOnce(state => state.loading).subscribe(loading => {
      expect(loading).toBe(true);
    });
  }));
});
