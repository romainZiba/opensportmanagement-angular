import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input()
  events: List<Event>;
  @Output()
  eventCreation = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  showEventCreation() {
    this.eventCreation.emit();
  }
}
