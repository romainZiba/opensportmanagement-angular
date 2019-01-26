import { Api } from './../core/models/api';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { EVENTS_API } from './token';
import { EventService } from './services/event.service';
import { EventMockService } from './services/event.mock.service';
import { EventHttpService } from './services/event.http.service';

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
export class EventsModule {
  static forRoot(eventsApi: Api): ModuleWithProviders {
    return {
      ngModule: EventsModule,
      providers: [
        {
          provide: EVENTS_API,
          useValue: eventsApi.baseUrl
        },
        {
          provide: EventService,
          useClass: eventsApi.useMock ? EventMockService : EventHttpService
        }
      ]
    };
  }
}
