import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EventService} from '../event.service';
import {switchMap} from 'rxjs/operators';
import {Event} from '../model/event';
import {AppSettings} from '../app-settings';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  presence = Presence;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private teamService: TeamService) { }

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
    this.teamService.participate(matchId, isParticipating).subscribe(event => {
      this.event = event;
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getEvent(params.get('id')))
    ).subscribe(event => this.event = event);
  }

}

// TODO: refactor duplicated code
enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
