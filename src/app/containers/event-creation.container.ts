import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar } from "@angular/material";
import { TeamService } from "../services/team.service";
import { OpponentService } from "../services/opponent.service";
import { PlaceService } from "../services/place.service";
import { EventCreateUpdate, EventType } from "../model/event";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { List } from "immutable";
import { Season } from "../model/season";
import { Championship } from "../model/championship";
import { BaseComponent } from "./base.container";
import { Team } from "../model/team";
import { map } from "rxjs/operators";

@Component({
  selector: "app-event-creation",
  template: `
    <event-creation [eventType]="eventType$ | async"
                    [selectedTeam]="selectedTeam$ | async"
                    [places]="places$ | async"
                    [opponents]="opponents$ | async"
                    [seasons]="seasons$ | async"
                    [championships]="championships$ | async"
                    (selectedSeason)="getChampionships($event)"
                    (event)="create($event)"
                    (new-opponent)="showNewOpponent()"
                    (new-place)="showNewPlace()"
                    (new-season)="showNewSeason()"
                    (new-championship)="showNewChampionship($event)"></event-creation>`
})
export class EventCreationSmartComponent extends BaseComponent
  implements OnInit, OnDestroy {
  eventType$: Observable<EventType>;
  seasons$: Observable<List<Season>>;
  championships$: Observable<List<Championship>>;

  subscriptions = new Subscription();

  training = EventType.TRAINING;
  selectedTeam$: Observable<Team>;
  places$ = this.placeService.places$;
  opponents$ = this.opponentService.opponents$;

  private eventType: EventType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private placeService: PlaceService,
    private opponentService: OpponentService,
    private snack: MatSnackBar
  ) {
    super(snack);
  }

  ngOnInit() {
    this.eventType$ = this.route.data.pipe(
      map(routeData => this.getEventType(routeData["eventtype"]))
    );
    const typeSub = this.eventType$.subscribe(type => (this.eventType = type));
    this.selectedTeam$ = this.teamService.selectedTeam$
      .filter(team => team !== null)
      .flatMap(team => {
        const teamId = team._id;
        this.placeService.getPlaces(teamId);
        this.opponentService.getOpponents(teamId);
        this.teamService.getSeasons(teamId);
        return of(team);
      });
    this.seasons$ = this.eventType$
      .filter(type => type === EventType.MATCH)
      .flatMap(() => this.teamService.seasons$);

    this.championships$ = this.eventType$
      .filter(type => type === EventType.MATCH)
      .flatMap(() => this.teamService.championships$);
    this.subscriptions.add(typeSub);
  }

  private getEventType(value): EventType {
    switch (value) {
      case "training":
        return EventType.TRAINING;
      case "match":
        return EventType.MATCH;
      default:
        return EventType.OTHER;
    }
  }

  getChampionships(seasonId: number) {
    this.teamService.getChampionships(seasonId);
  }

  create(event: EventCreateUpdate) {
    switch (event.type) {
      case EventType.MATCH:
        this.createMatch(event);
        break;
      default:
        this.createEvent(event);
    }
  }

  private createMatch(eventCreation: EventCreateUpdate) {
    this.teamService.createMatch(eventCreation).then(
      success => {
        // TODO: i18n
        if (success) {
          this.openSnackBar("Le match a été créé avec succès");
          this.router.navigate(["/event-list"]);
        } else {
          this.openSnackBar("Une erreur est survenue");
        }
      },
      () => this.openSnackBar("Une erreur est survenue")
    );
  }

  private createEvent(eventCreation: EventCreateUpdate) {
    this.teamService.createEvent(eventCreation).then(
      success => {
        // TODO: i18n
        if (success) {
          this.openSnackBar("L'évènement a été créé avec succès");
          this.router.navigate(["/event-list"]);
        } else {
          this.openSnackBar("Une erreur est survenue");
        }
      },
      () => this.openSnackBar("Une erreur est survenue")
    );
  }

  showNewOpponent() {
    this.router.navigate(["/new-opponent"]);
  }

  showNewPlace() {
    this.router.navigate(["/new-place"]);
  }

  showNewSeason() {
    this.router.navigate(["/new-season"]);
  }

  showNewChampionship(seasonId: number) {
    this.router.navigate(["/seasons", seasonId, "new-championship"]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
