import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../services/event.service';
import {Event} from '../model/event';
import {Team} from '../model/team';
import {TeamService} from '../services/team.service';
import {AppSettings} from '../app-settings';
import {Router} from '@angular/router';
import {speedDialAnimation} from '../speed-dial';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [speedDialAnimation]
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[];
  presence = Presence;
  currentPage = 0;
  totalElements: number;
  pageSize = 25;
  options = [
    // TODO Internationalization: https://github.com/angular/angular/issues/11405
    { label: 'Nouvel entraînement', icon: 'far fa-calendar-alt', url: '/new-training' },
    { label: 'Nouveau match', icon: 'fas fa-basketball-ball', url: '/new-match' },
    { label: 'Nouvel évènement', icon: 'fas fa-beer', url: '/new-event' },
  ];
  hasLabels = true;
  selectedTeam: Team;
  subscriptions = new Subscription();

  constructor(private eventService: EventService,
              private teamService: TeamService,
              private router: Router) { }

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

  ngOnInit() {
    this.subscriptions.add(
      this.teamService.selectedTeam$.subscribe(team => {
        if (team !== null && team !== undefined) {
          this.selectedTeam = team;
          this.loadEvents();
        }
      })
    );

    this.subscriptions.add(
      this.eventService.events$.subscribe(response => {
        if (response.hasOwnProperty('page')) {
          this.totalElements = response['page']['totalElements'];
          this.currentPage = response['page']['number'];
          this.pageSize = response['page']['size'];
          if (this.totalElements > 0) {
            this.events = response['_embedded']['eventDtoes'];
          } else {
            this.events = [];
          }
        }
      })
    );
  }

  loadEvents(page = this.currentPage, size = this.pageSize) {
    this.eventService.getEvents(this.selectedTeam._id,  page, size);
  }

  participate(matchId: number, isParticipating: boolean) {
    this.subscriptions.add(this.teamService.participate(matchId, isParticipating).subscribe(event => {
        const index = this.events.map(e => e._id).indexOf(event._id);
        this.events[index] = event;
      })
    );
  }

  showDetails(eventId: number) {
    this.router.navigate(['/events', eventId]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showEventCreationPanel(url: string) {
    this.router.navigate([`${url}`]);
  }
}

enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
