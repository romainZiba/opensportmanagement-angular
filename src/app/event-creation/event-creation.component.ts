import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DateAdapter} from '@angular/material';
import {AmazingTimePickerService} from '../atp-library/atp-time-picker.service';
import {FormControl} from '@angular/forms';
import {PlaceService} from '../services/place.service';
import {HelperService} from '../services/helper.service';
import {OpponentService} from '../services/opponent.service';
import {Opponent} from '../model/opponent';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit, OnDestroy {

  eventType: string;

  placesByGroup = [];
  minDate = new Date();
  placeControl = new FormControl();
  opponentControl = new FormControl();
  kindOfMatch = [
    'Home',
    'Away',
    'None'
  ];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  opponents: Opponent[];


  selectedKindOfMatch: string; // Home, away, or none
  selectedPlaceId: number;
  selectedOpponentId: number;
  selectedStartDate = new FormControl(new Date());
  selectedEndDate = new FormControl(new Date());
  selectedStartTime: string;
  selectedEndTime: string;
  recurrentEvent = false;
  selectedDays = new FormControl();
  private disposables = [];

  constructor(private route: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private atp: AmazingTimePickerService,
              private placeService: PlaceService,
              private helperService: HelperService,
              private opponentService: OpponentService) { }

  ngOnInit() {
    this.adapter.setLocale('fr');
    this.disposables.push(
      this.route.data.subscribe(value => this.eventType = value['eventtype'])
    );
    this.disposables.push(
      this.placeService.getPlaces().subscribe(places => {
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
    this.disposables.push(
      this.opponentService.getOpponents().subscribe(opponents => {
        this.opponents = opponents;
      })
    );
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
}
