import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {EventService} from '../services/event.service';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from './base.container';
import {MatSnackBar} from '@angular/material';
import {Event} from '../model/event';

@Component({
  selector: 'app-event-details',
  template: `
    <event-details [event]="event$ | async"
                   [isAdmin]="isUserAdmin$ | async"
                   (participation)="participate($event)"
                   (messages)="showMessages()"
                   (settings)="showSettings()"></event-details>
  `,
})
export class EventDetailsSmartComponent extends BaseComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  event$: Observable<Event>;
  selectedTeam$: Observable<Team>;
  eventId: number;
  isUserAdmin$: Observable<boolean>;

  constructor(private router: Router,
              private eventService: EventService,
              private teamService: TeamService,
              private snackbar: MatSnackBar,
              private route: ActivatedRoute) {
    super(snackbar);
  }

  ngOnInit() {
    this.isUserAdmin$ = this.teamService.currentTeamMember$
      .map(member => member !== null && member.roles.includes('ADMIN'));
    this.eventId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // // Fetch the event from network
    this.eventService.getEvent(this.eventId);
    // Observe every modification on this event
    this.event$ = this.eventService.event$.filter(event => event !== null);
  }

  participate(isParticipating: boolean) {
    this.eventService.participate(this.eventId, isParticipating).then(success => {
        if (!success) {
          this.openSnackBar('Inscription impossible');
        }
      }
    );
  }

  showMessages() {
    this.router.navigate([`/events/${this.eventId}/messages`]);

  }

  showSettings() {
    this.router.navigate([`/events/${this.eventId}/settings`]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
