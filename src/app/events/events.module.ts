import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { NgxsModule } from '@ngxs/store';
import { EventsState } from './store';
import { EventsPageComponent } from './pages/list/events-page.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { NewEventPageComponent } from './pages/new-event/new-event-page.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import {
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatButtonModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    SharedModule,
    NgxsModule.forFeature([EventsState]),
    NgxsFormPluginModule
  ],
  declarations: [EventItemComponent, EventsPageComponent, NewEventPageComponent]
})
export class EventsModule {}
