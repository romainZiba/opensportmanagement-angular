import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {switchMap} from 'rxjs/operators';
import {Event} from '../../model/event';
import {AppSettings} from '../../app-settings';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  event: Event;
  presence = Presence;
  routeSub: Subscription;
  participationSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) { }

  // TODO: refactor duplicated code
  isUserPresent(event: Event): Presence {
    const currentUsername = localStorage.getItem(AppSettings.currentUsernameKey);
    if (event.presentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Present;
    } else if (event.absentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Absent;
    }
    return Presence.Unknown;
  }
  participate(matchId: number, isParticipating: boolean) {
    this.eventService.participate(matchId, isParticipating);
  }

  ngOnInit() {
    this.routeSub = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getEvent(params.get('id')))
    ).subscribe(event => this.event = event);

    this.eventService.event$
      .filter(event => event !== null)
      .subscribe(event => this.event = event);
  }

  ngOnDestroy() {
    if (this.routeSub !== undefined) {
      this.routeSub.unsubscribe();
    }
    if (this.participationSub !== undefined) {
      this.participationSub.unsubscribe();
    }
  }

  showMessages(eventId: number) {
    this.router.navigate([`/events/${eventId}/messages`]);
  }
}

// TODO: refactor duplicated code
enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
