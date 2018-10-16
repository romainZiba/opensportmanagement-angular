import { Component, OnInit } from "@angular/core";
import { List } from "immutable";
import { Event } from "../../models/event";

@Component({
  selector: "app-events",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  private event1: Event = {
    _id: 1,
    name: "Event #1",
    fromDateTime: "",
    toDateTime: "",
    placeId: 1,
    placeName: "The place",
    done: true,
    localTeamName: "Team #1",
    visitorTeamName: "Team #2",
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: true
  };

  private event2: Event = {
    _id: 2,
    name: "Event #2",
    fromDateTime: "",
    toDateTime: "",
    placeId: 1,
    placeName: "The place",
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: true
  };

  private event3: Event = {
    _id: 3,
    name: "Event #3",
    fromDateTime: "",
    toDateTime: "",
    placeId: 1,
    placeName: "The place",
    done: false,
    localTeamName: "Team #1",
    visitorTeamName: "Team #2",
    presentMembers: [],
    absentMembers: [],
    waitingMembers: [],
    cancelled: false,
    openForRegistration: true
  };

  events: List<Event> = List([this.event1, this.event2, this.event3]);

  constructor() {}

  ngOnInit() {}
}
