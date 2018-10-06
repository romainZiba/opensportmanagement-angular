import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatSnackBar} from '@angular/material';
import {TeamService} from '../services/team.service';
import {PlaceService} from '../services/place.service';
import {Event, EventCreateUpdate} from '../model/event';
import {BaseComponent} from './base.container';
import {EventService} from '../services/event.service';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: "app-event-settings",
  template: `
    <event-settings [event]="event$ | async"
                    [places]="places$ | async"
                    (event)="update($event)"
                    (new-place)="showNewPlace()">
    </event-settings>`
})
export class EventSettingsSmartComponent extends BaseComponent
  implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  places$ = this.placeService.places$;
  event$: Observable<Event>;
  eventId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private teamService: TeamService,
    private placeService: PlaceService,
    private eventService: EventService,
    private snack: MatSnackBar
  ) {
    super(snack);
  }

  ngOnInit() {
    this.eventId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    // Fetch the event from network
    this.eventService.getEvent(this.eventId);

    this.event$ = this.eventService.event$.filter(event => event !== null);
    const placesSub = this.teamService.selectedTeam$
      .pipe(
        filter(team => team !== null),
        tap(team => this.placeService.getPlaces(team._id))
      )
      .subscribe();
    this.subscriptions.add(placesSub);
  }

  update(eventUpdate: EventCreateUpdate) {
    this.eventService.updateEvent(this.eventId, eventUpdate).then(success => {
      // TODO: i18n
      if (success) {
        this.openSnackBar("L'évènement a été modifié avec succès");
        this.location.back();
      } else {
        this.openSnackBar("Une erreur est survenue");
      }
    });
  }

  showNewPlace() {
    this.router.navigate(["/new-place"]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
