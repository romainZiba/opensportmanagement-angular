import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Opponent} from '../../model/opponent';
import * as moment from 'moment';
import {Subscription} from 'rxjs/Subscription';
import {FORMAT_DATE} from '../../app.module';
import {EventCreateUpdate, EventType} from '../../model/event';
import {Season} from '../../model/season';
import {Championship} from '../../model/championship';
import {DateValidator} from '../../validators/DateValidator';
import {Team} from '../../model/team';
import {List} from 'immutable';
import {Place} from '../../model/place';

@Component({
  selector: "event-creation",
  templateUrl: "./event-creation.component.html",
  styleUrls: ["./event-creation.component.css"]
})
export class EventCreationComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  form: FormGroup;

  // TODO i18n: https://github.com/angular/angular/issues/11405
  kindOfMatch = ["Home", "Away", "None"];
  daysOfWeek = [
    { id: "Monday", name: "Lundi" },
    { id: "Tuesday", name: "Mardi" },
    { id: "Wednesday", name: "Mercredi" },
    { id: "Thursday", name: "Jeudi" },
    { id: "Friday", name: "Vendredi" },
    { id: "Saturday", name: "Samedi" },
    { id: "Sunday", name: "Dimanche" }
  ];

  placesByGroup = [];

  @Input()
  eventType: EventType;
  @Input()
  selectedTeam: Team;
  @Input()
  seasons: List<Season>;
  @Input()
  championships: List<Championship>;
  @Input()
  set places(places: List<Place>) {
    this.placesByGroup = places.isEmpty()
      ? []
      : places.groupBy(place => place.type).toJS();
  }
  @Input()
  opponents: List<Opponent>;

  @Output("selectedSeason")
  seasonEmitter = new EventEmitter<number>();
  @Output("event")
  eventEmitter = new EventEmitter<EventCreateUpdate>();
  @Output("new-place")
  newPlaceClickEmitter = new EventEmitter();
  @Output("new-opponent")
  newOpponentClickEmitter = new EventEmitter();
  @Output("new-season")
  newSeasonClickEmitter = new EventEmitter();
  @Output("new-championship")
  newChampionshipClickEmitter = new EventEmitter<number>();

  private subscriptions = new Subscription();

  kindOfMatchControl = new FormControl(); // Home, away, or none
  eventNameControl = new FormControl("");
  recurrentControl = new FormControl(false);
  fromDateControl = new FormControl(moment().format(FORMAT_DATE), [
    Validators.required,
    DateValidator.dateMinimum(moment().startOf("day"))
  ]);
  toDateControl = new FormControl(moment().format(FORMAT_DATE), [
    Validators.required,
    DateValidator.dateMinimum(moment().startOf("day"))
  ]);
  seasonControl = new FormControl(null);
  championshipControl = new FormControl({ value: null, disabled: true });
  placeControl = new FormControl("", [Validators.required]);
  opponentControl = new FormControl(null);
  fromTimeControl = new FormControl("20:00", Validators.required);
  toTimeControl = new FormControl("22:30", Validators.required);
  daysControl = new FormControl();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      eventNameControl: this.eventNameControl,
      recurrentControl: this.recurrentControl,
      placeControl: this.placeControl,
      opponentControl: this.opponentControl,
      fromTimeControl: this.fromTimeControl,
      toTimeControl: this.toTimeControl,
      daysControl: this.daysControl,
      fromDateControl: this.fromDateControl,
      toDateControl: this.toDateControl,
      kindOfMatchControl: this.kindOfMatchControl,
      seasonControl: this.seasonControl,
      championshipControl: this.championshipControl
    });
  }

  ngOnInit() {
    switch (this.eventType) {
      case EventType.MATCH:
        this.championshipControl.setValidators(Validators.required);
        this.opponentControl.setValidators(Validators.required);
        this.championshipControl.updateValueAndValidity();
        this.opponentControl.updateValueAndValidity();
        break;
      case EventType.TRAINING:
        break;
      default:
        this.eventNameControl.setValidators(Validators.required);
        break;
    }
    const fromDateChangeSub = this.fromDateControl.valueChanges.subscribe(() =>
      this.onFromDateChanged()
    );
    const recurrentChangeSub = this.recurrentControl.valueChanges.subscribe(
      () => this.onRecurrentChecked()
    );
    const seasonsChangesSub = this.seasonControl.valueChanges.subscribe(
      seasonId => {
        this.isSeasonSelected(seasonId)
          ? (this.championshipControl.enable(),
            this.seasonEmitter.emit(seasonId))
          : this.championshipControl.disable();
      }
    );
    this.subscriptions
      .add(fromDateChangeSub)
      .add(recurrentChangeSub)
      .add(seasonsChangesSub);
  }

  isSeasonSelected(seasonId) {
    return seasonId !== null && seasonId !== undefined;
  }

  private onRecurrentChecked() {
    this.recurrentControl.value
      ? this.daysControl.setValidators(Validators.required)
      : this.daysControl.setValidators(null);
    this.daysControl.updateValueAndValidity();
  }

  private onFromDateChanged() {
    const fromDate = moment(this.fromDateControl.value);
    const toDate = moment(this.toDateControl.value);
    if (toDate.isBefore(fromDate)) {
      this.toDateControl.setValue(this.fromDateControl.value);
    }
  }

  isEventMatch() {
    return this.eventType === EventType.MATCH;
  }

  onCreateOpponent() {
    this.newOpponentClickEmitter.emit();
  }

  onCreatePlace() {
    this.newPlaceClickEmitter.emit();
  }

  onCreateSeason() {
    this.newSeasonClickEmitter.emit();
  }

  onCreateChampionship() {
    this.newChampionshipClickEmitter.emit(this.seasonControl.value);
  }

  isNameDisplayed() {
    return this.eventType === EventType.OTHER;
  }

  onSaveEvent(
    eventName: string,
    season: string,
    championshipId: number,
    recurrent: boolean,
    days: string[],
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    kindOfMatch: string,
    placeId: number,
    opponentId: number
  ) {
    const eventCreation = new EventCreateUpdate();
    eventCreation.name = eventName;
    eventCreation.fromDate = fromDate;
    eventCreation.toDate = toDate;
    eventCreation.fromTime = fromTime;
    eventCreation.toTime = toTime;
    eventCreation.placeId = placeId;
    eventCreation.isRecurrent = recurrent;
    eventCreation.opponentId = opponentId;
    eventCreation.teamId = this.selectedTeam._id;
    eventCreation.championshipId = championshipId;
    eventCreation.type = this.eventType;
    if (days !== null) {
      eventCreation.recurrenceDays = days.map((day: string) =>
        day.toUpperCase()
      );
    }
    this.eventEmitter.emit(eventCreation);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
