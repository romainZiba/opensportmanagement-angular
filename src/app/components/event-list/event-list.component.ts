import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from '../../model/event';
import {speedDialAnimation} from '../../speed-dial/index';
import {List} from 'immutable';
import {TeamMember} from '../../model/team-member';
import {Team} from '../../model/team';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [speedDialAnimation]
})
export class EventListComponent implements OnInit {

  @Input()
  selectedTeam: Team;
  @Input()
  teamMember: TeamMember;
  @Input()
  events: List<Event>;
  @Input()
  totalElements: number;
  @Input()
  page: number;
  @Input()
  pageSize: number;

  @Output('pager')
  pagerEmitter = new EventEmitter<PageEvent>();
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

  ngOnInit() {
  }

  onShowDetails(eventId: number) {
    this.detailsEmitter.emit(eventId);
  }

  onShowEventCreationPanel(url: string) {
    this.creationEmitter.emit(url);
  }

  onLoadEvents(page: number, size: number) {
    this.pagerEmitter.emit(new PageEvent(page, size));
  }
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
