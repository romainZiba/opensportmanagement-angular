import { Component, OnInit } from "@angular/core";
import { Event } from "../../models/event";
import { Select } from "@ngxs/store";
import { EventsState } from "../../store";
import { Observable } from "rxjs/Observable";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-events",
  templateUrl: "new-event-page.component.html",
  styleUrls: ["new-event-page.component.scss"]
})
export class NewEventPageComponent implements OnInit {
  @Select(EventsState.getAllEvents)
  events$: Observable<Event[]>;

  nameCtrl: FormControl;
  matchForm: FormGroup;
  datesForm: FormGroup;
  minDate = moment();

  constructor(fb: FormBuilder) {
    this.nameCtrl = fb.control("", Validators.required);
    this.datesForm = fb.group({});

    this.matchForm = fb.group({
      name: this.nameCtrl,
      datesForm: this.datesForm
    });
  }

  ngOnInit() {}

  onSubmit() {}
}
