import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PlaceService} from '../services/place.service';
import {OpponentService} from '../services/opponent.service';
import {Opponent} from '../model/opponent';
import * as moment from 'moment';
import {Moment} from 'moment';
import {TeamService} from '../services/team.service';
import {Subscription} from 'rxjs/Subscription';
import {PlaceCreationComponent} from '../place-creation/place-creation.component';
import {OpponentCreationComponent} from '../opponent-creation/opponent-creation.component';
import {FORMAT_DATE} from '../app.module';
import {EventCreation, EventType} from '../model/event';
import {Season} from '../model/season';
import {Championship} from '../model/championship';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  eventForm: FormGroup;
  selectedTeamId: number;
  eventType: EventType;
  placesByGroup = [];
  // TODO i18n: https://github.com/angular/angular/issues/11405
  kindOfMatch = ['Home', 'Away', 'None'];
  daysOfWeek = [{id: 'Monday', name: 'Lundi'}, {id: 'Tuesday', name: 'Mardi'}, {id: 'Wednesday', name: 'Mercredi'},
    {id: 'Thursday', name: 'Jeudi'}, {id: 'Friday', name: 'Vendredi'}, {id: 'Saturday', name: 'Samedi'}, {id: 'Sunday', name: 'Dimanche'}];
  opponents: Opponent[];
  seasons: Season[];
  championships: Championship[];

  kindOfMatchControl = new FormControl(); // Home, away, or none
  eventNameControl = new FormControl('', [Validators.required]);
  recurrentControl = new FormControl(false);
  fromDateControl = new FormControl(moment().format(FORMAT_DATE),
    [Validators.required, DateValidator.dateMinimum(moment().startOf('day'))]);
  toDateControl = new FormControl(moment().format(FORMAT_DATE),
    [Validators.required, DateValidator.dateMinimum(moment().startOf('day'))]);
  seasonControl = new FormControl('', [Validators.required]);
  championshipControl = new FormControl('', Validators.required);
  placeControl = new FormControl('', [Validators.required]);
  opponentControl = new FormControl('', Validators.required);
  fromTimeControl = new FormControl('20:00');
  toTimeControl = new FormControl('22:30');
  daysControl = new FormControl();
  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private teamService: TeamService,
              private placeService: PlaceService,
              private opponentService: OpponentService,
              private dialog: MatDialog,
              fb: FormBuilder) {
    this.eventForm = fb.group({
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
    const routeSubscription = this.route.data.subscribe(routeData => this.getEventType(routeData));
    const selectedTeamSubscription = this.teamService.selectedTeam$.subscribe(team => this.onTeamSelected(team));
    const placesSubscription = this.placeService.places$.subscribe(places => this.onPlacesReceived(places));
    const opponentsSubscription = this.opponentService.opponents$.subscribe(opponents => this.opponents = opponents.toJS());
    const fromDateChangeSub = this.fromDateControl.valueChanges.subscribe(() => this.onFromDateChanged());
    const recurrentChangeSub = this.recurrentControl.valueChanges.subscribe(() => this.onRecurrentChecked());
    this.subscriptions.add(routeSubscription)
      .add(selectedTeamSubscription)
      .add(placesSubscription)
      .add(opponentsSubscription)
      .add(fromDateChangeSub)
      .add(recurrentChangeSub);

    switch (this.eventType) {
      case EventType.TRAINING:
        this.recurrentControl.setValue(true);
      case EventType.OTHER:
        this.championshipControl.disable();
        this.opponentControl.disable();
        break;
      case EventType.MATCH:
        const seasonsSub = this.teamService.seasons$.subscribe(seasons => this.seasons = seasons.toJS());
        const championshipsSub = this.seasonControl.valueChanges
          .flatMap(seasonId => this.teamService.getChampionships(seasonId))
          .subscribe(champ => this.championships = champ);
        this.subscriptions.add(seasonsSub)
          .add(championshipsSub);
        break;
    }
  }

  private onPlacesReceived(places) {
    if (!places.isEmpty()) {
      this.placesByGroup = places.groupBy(place => place.type).toJS();
    }
  }

  private getEventType(value) {
    switch (value['eventtype']) {
      case 'training':
        this.eventType = EventType.TRAINING;
        break;
      case 'match':
        this.eventType = EventType.MATCH;
        break;
      default:
        this.eventType = EventType.OTHER;
    }
  }

  private onTeamSelected(team) {
    if (team !== null) {
      this.selectedTeamId = team._id;
      this.placeService.getPlaces(this.selectedTeamId);
      this.opponentService.getOpponents(this.selectedTeamId);
      this.teamService.getSeasons(this.selectedTeamId);
    }
  }

  private onRecurrentChecked() {
    if (this.recurrentControl.value) {
      this.daysControl.setValidators(Validators.required);
    } else {
      this.daysControl.setValidators(null);
    }
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

  createOpponent() {
    this.dialog.open(OpponentCreationComponent, {
      height: '400px',
      width: '600px',
    });
  }

  createPlace() {
    this.dialog.open(PlaceCreationComponent, {
      height: '400px',
      width: '600px',
    });
  }

  createSeason() {

  }

  saveEvent() {
    const eventCreation = new EventCreation();
    eventCreation.name = this.eventNameControl.value;
    eventCreation.fromDate = this.fromDateControl.value;
    eventCreation.toDate = this.toDateControl.value;
    eventCreation.fromTime = this.fromTimeControl.value;
    eventCreation.toTime = this.toTimeControl.value;
    eventCreation.placeId = this.placeControl.value;
    eventCreation.isRecurrent = this.recurrentControl.value;
    eventCreation.opponentId = this.opponentControl.value;
    if (this.daysControl.value !== null) {
      eventCreation.recurrenceDays = this.daysControl.value.map((day: string) => day.toUpperCase());
    }
    if (this.eventType === EventType.MATCH) {
      this.createMatch(this.championshipControl.value, eventCreation);
    } else {
      this.createEvent(this.selectedTeamId, eventCreation);
    }
  }

  private createMatch(championshipId: number, eventCreation: EventCreation) {
    this.teamService.createMatch(championshipId, eventCreation)
      .then(success => {
        // TODO: i18n
        if (success) {
          this.openSnackBar('Le match a été créé avec succès');
          this.router.navigate(['/event-list']);
        } else {
          this.openSnackBar('Une erreur est survenue');
        }
      }, () => this.openSnackBar('Une erreur est survenue'));
  }

  private createEvent(teamId: number, eventCreation: EventCreation) {
    this.teamService.createEvent(teamId, eventCreation)
      .then(success => {
        // TODO: i18n
        if (success) {
          this.openSnackBar('L\'évènement a été créé avec succès');
          this.router.navigate(['/event-list']);
        } else {
          this.openSnackBar('Une erreur est survenue');
        }
      }, () => this.openSnackBar('Une erreur est survenue'));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

export class DateValidator {
  static dateMinimum(date: Moment): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const inputDate = moment(control.value);
      if (!inputDate.isValid()) {
        return null;
      }
      return inputDate.isSameOrAfter(date) ? null : {
        'minDate': {
          'minDate': date.format(FORMAT_DATE),
          'actual': inputDate.format(FORMAT_DATE)
        }
      };
    };
  }
}
