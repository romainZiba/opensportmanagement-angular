import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from '../../model/event';
import {List} from 'immutable';
import {TeamMember} from '../../model/team-member';
import {Team} from '../../model/team';

@Component({
  selector: "event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  @Input()
  allEvents: boolean;
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

  @Output("pager")
  pagerEmitter = new EventEmitter<PageEvent>();
  @Output("details")
  detailsEmitter = new EventEmitter<number>();
  @Output("eventCreation")
  creationEmitter = new EventEmitter<string>();

  options = [
    // TODO i18n: https://github.com/angular/angular/issues/11405
    {
      label: "Nouvel entraînement",
      admin: false,
      icon: "far fa-calendar-alt",
      url: "/new-training"
    },
    {
      label: "Nouveau match",
      admin: true,
      icon: "fas fa-basketball-ball",
      url: "/new-match"
    },
    {
      label: "Nouvel évènement",
      admin: false,
      icon: "fas fa-beer",
      url: "/new-event"
    }
  ];

  ngOnInit() {}

  onShowDetails(eventId: number) {
    const chosenEvent = this.events.filter(event => event._id === eventId)[0];
    if (!chosenEvent.cancelled || this.teamMember.roles.includes("ADMIN")) {
      this.detailsEmitter.emit(eventId);
    }
  }

  onShowEventCreationPanel(url: string) {
    this.creationEmitter.emit(url);
  }

  onLoadEvents(page: number, size: number, retrieveAll: boolean) {
    this.pagerEmitter.emit(new PageEvent(page, size, retrieveAll));
  }
}

export class PageEvent {
  currentPage: number;
  pageSize: number;
  retriveAll: boolean;
  constructor(page: number, size: number, retriveAll: boolean) {
    this.currentPage = page;
    this.pageSize = size;
    this.retriveAll = retriveAll;
  }
}
