import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {AmazingTimePickerService} from '../atp-library/atp-time-picker.service';
import {FormControl, Validators} from '@angular/forms';
import {PlaceService} from '../services/place.service';
import {HelperService} from '../services/helper.service';
import {OpponentService} from '../services/opponent.service';
import {Opponent} from '../model/opponent';
import * as moment from 'moment';
import {Moment} from 'moment';
import {EventCreation} from '../model/event';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit, OnDestroy {

  selectedTeamId: number;
  eventType: string;

  placesByGroup = [];
  minDate = moment();
  kindOfMatch = ['Home', 'Away', 'None'];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  opponents: Opponent[];

  nameMatcher = new ErrorStateMatcher();
  toDateMatcher = new ErrorStateMatcher();

  nameControl = new FormControl('', [Validators.required]);
  placeControl = new FormControl();
  opponentControl = new FormControl();
  selectedKindOfMatch: string; // Home, away, or none
  selectedPlaceId: number;
  selectedOpponentId: number;
  fromDateControl = new FormControl(moment());
  toDateControl = new FormControl(this.fromDateControl.value);
  fromTimeControl = new FormControl('20:00');
  toTimeControl = new FormControl('22:30');
  recurrentEvent = false;
  daysControl = new FormControl([]);
  selectedDays = [];
  private disposables = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private adapter: DateAdapter<Moment>,
              private atp: AmazingTimePickerService,
              private teamService: TeamService,
              private placeService: PlaceService,
              private helperService: HelperService,
              private opponentService: OpponentService) { }

  ngOnInit() {
    this.adapter.setLocale('fr');
    this.disposables.push(
      this.route.data.subscribe(value => this.eventType = value['eventtype'])
    );
    this.disposables.push(
      this.teamService.selectedTeam$
        .flatMap(selectedTeam => {
          this.selectedTeamId = selectedTeam._id;
          return this.placeService.getPlaces(this.selectedTeamId);
        })
        .subscribe(places => {
          const groups = this.helperService.groupBy(places, 'type');
          const types = Object.keys(groups);
          const self = this;
          types.forEach(function (type) {
            self.placesByGroup.push({
              type: type,
              places: groups[type]
            });
          });
        })
    );
    // this.disposables.push(
    //   this.opponentService.getOpponents().subscribe(opponents => {
    //     this.opponents = opponents;
    //   })
    // );

    if (this.eventType === 'training') {
      this.recurrentEvent = true;
    }
  }

  ngOnDestroy() {
    this.disposables.forEach(function(sub) {
      if (sub !== undefined) {
        sub.unsubscribe();
      }
    });
  }

  createOpponent() {
    // TODO
  }

  createPlace() {
    // TODO
  }

  saveEvent() {
    const eventCreation = new EventCreation();
    eventCreation.name = this.nameControl.value;
    eventCreation.fromDate = this.fromDateControl.value;
    eventCreation.toDate = this.toDateControl.value;
    eventCreation.fromTime = this.fromTimeControl.value;
    eventCreation.toTime = this.toTimeControl.value;
    eventCreation.placeId = this.selectedPlaceId;
    eventCreation.isRecurrent = this.recurrentEvent;
    eventCreation.recurrenceDays = this.selectedDays.map((day: string) => day.toUpperCase());
    this.disposables.push(
      this.teamService.createEvent(this.selectedTeamId, eventCreation).subscribe(response => {
        if (response.status === 201) {
          this.openSnackBar('Event successfully created');
          this.router.navigate(['/event-list']);
        } else {
          this.openSnackBar('An error occurred');
        }
      })
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }
}
