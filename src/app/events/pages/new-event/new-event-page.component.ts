import { Component, OnInit } from "@angular/core";
import { Event } from "../../models/event";
import { Select } from "@ngxs/store";
import { EventsState } from "../../store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-events",
  template: `
    <app-new-event></app-new-event>
  `
})
export class NewEventPageComponent implements OnInit {
  @Select(EventsState.getAllEvents)
  events$: Observable<Event[]>;

  constructor() {}

  ngOnInit() {}
}
