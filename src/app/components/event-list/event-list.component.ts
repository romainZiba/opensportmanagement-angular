import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Event} from '../../model/event';
import {AppSettings} from '../../app-settings';
import {speedDialAnimation} from '../../speed-dial/index';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';
import {TeamMember} from '../../model/team-member';
import {Team} from '../../model/team';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [speedDialAnimation]
})
export class EventListComponent implements OnInit, OnDestroy {

  @Input()
  selectedTeam: Team;
  @Input()
  teamMember: TeamMember;
  @Input()
  events: List<Event>;
  @Input()
  presence = Presence;
  @Input()
  totalElements: number;
  @Input()
  page: number;
  @Input()
  pageSize: number;

  @Output('pager')
  pagerEmitter = new EventEmitter<PageEvent>();
  @Output('participation')
  participationEmitter = new EventEmitter<Participation>();
  @Output('details')
  detailsEmitter = new EventEmitter<number>();
  @Output('eventCreation')
  creationEmitter = new EventEmitter<string>();


  options = [
    // TODO i18n: https://github.com/angular/angular/issues/11405
    { label: 'Nouvel entraînement', admin: false, icon: 'far fa-calendar-alt', url: '/new-training' },
    { label: 'Nouveau match', admin: true, icon: 'fas fa-basketball-ball', url: '/new-match' },
    { label: 'Nouvel évènement', admin: false, icon: 'fas fa-beer', url: '/new-event' },
  ];
  subscriptions = new Subscription();


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

  onParticipate(eventId: number, isParticipating: boolean) {
    this.participationEmitter.emit(new Participation(eventId, isParticipating));
  }

  ngOnInit() {
  }


  showDetails(eventId: number) {
    this.detailsEmitter.emit(eventId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onShowEventCreationPanel(url: string) {
    this.creationEmitter.emit(url);
  }

  onLoadEvents(page: number, size: number) {
    this.pagerEmitter.emit(new PageEvent(page, size));
  }
}

enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}

export class PageEvent {
  currentPage: number;
  pageSize: number;
  constructor(page: number, size: number) {
    this.currentPage = page;
    this.pageSize = size;
  }
}

export class Participation {
  eventId: number;
  presence: boolean;
  constructor(eventId: number, presence: boolean) {
    this.eventId = eventId;
    this.presence = presence;
  }
}
