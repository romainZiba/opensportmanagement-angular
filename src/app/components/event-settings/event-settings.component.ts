import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidator} from '../../validators/DateValidator';
import {Place} from '../../model/place';
import {Event, EventCreateUpdate} from '../../model/event';
import {List} from 'immutable';
import * as moment from 'moment';
import {FORMAT_DATE, FORMAT_TIME} from '../../app.module';

@Component({
  selector: "event-settings",
  templateUrl: "./event-settings.component.html",
  styleUrls: ["./event-settings.component.css"]
})
export class EventSettingsComponent implements OnChanges, OnDestroy {
  objectKeys = Object.keys;
  form: FormGroup;
  placesByGroup = {};

  @Input()
  event: Event;
  @Input()
  set places(places: List<Place>) {
    this.placesByGroup = places.isEmpty()
      ? {}
      : places.groupBy(place => place.type).toJS();
  }

  @Output("event")
  eventEmitter = new EventEmitter<EventCreateUpdate>();
  @Output("new-place")
  newPlaceClickEmitter = new EventEmitter();

  private subscriptions = new Subscription();

  fromDateControl = new FormControl("", [
    Validators.required,
    DateValidator.dateMinimum(moment().startOf("day"))
  ]);
  toDateControl = new FormControl("", [
    Validators.required,
    DateValidator.dateMinimum(moment().startOf("day"))
  ]);
  placeControl = new FormControl("", [Validators.required]);
  fromTimeControl = new FormControl("", Validators.required);
  toTimeControl = new FormControl("", Validators.required);

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      placeControl: this.placeControl,
      fromTimeControl: this.fromTimeControl,
      toTimeControl: this.toTimeControl,
      fromDateControl: this.fromDateControl,
      toDateControl: this.toDateControl
    });
  }

  ngOnChanges() {
    if (this.event !== null) {
      const fromDateTime = moment(this.event.fromDateTime);
      const toDateTime = moment(this.event.toDateTime);
      this.fromDateControl.setValue(fromDateTime.format(FORMAT_DATE));
      this.fromTimeControl.setValue(fromDateTime.format(FORMAT_TIME));
      this.toDateControl.setValue(toDateTime.format(FORMAT_DATE));
      this.toTimeControl.setValue(toDateTime.format(FORMAT_TIME));
      this.placeControl.setValue(this.event.placeId);
      const fromDateChangeSub = this.fromDateControl.valueChanges.subscribe(
        () => this.onFromDateChanged()
      );
      this.subscriptions.add(fromDateChangeSub);
    }
  }

  private onFromDateChanged() {
    const fromDate = moment(this.fromDateControl.value);
    const toDate = moment(this.toDateControl.value);
    if (toDate.isBefore(fromDate)) {
      this.toDateControl.setValue(this.fromDateControl.value);
    }
  }

  onCreatePlace() {
    this.newPlaceClickEmitter.emit();
  }

  onUpdateEvent(
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    placeId: number
  ) {
    const eventUpdate = new EventCreateUpdate();
    eventUpdate.fromDate = fromDate;
    eventUpdate.toDate = toDate;
    eventUpdate.fromTime = fromTime;
    eventUpdate.toTime = toTime;
    eventUpdate.placeId = placeId;
    this.eventEmitter.emit(eventUpdate);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
