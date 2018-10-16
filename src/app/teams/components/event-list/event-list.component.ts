import {Component, Input, OnInit} from '@angular/core';
import {List} from 'immutable';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  events: List<Event>;

  constructor() { }

  ngOnInit() {
  }

}
