import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { EventsState } from './store';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventsPageComponent } from './pages/list/events-page.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventService } from './services/event.service';
import { NewEventPageComponent } from './pages/new-event/new-event-page.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    NgxsModule.forFeature([EventsState]),
    NgxsFormPluginModule
  ],
  providers: [EventService],
  declarations: [EventItemComponent, EventListComponent, EventsPageComponent, NewEventPageComponent]
})
export class EventsModule {}
