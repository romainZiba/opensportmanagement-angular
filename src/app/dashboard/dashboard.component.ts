import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../model/event'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Opensportmanagement';
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

}
