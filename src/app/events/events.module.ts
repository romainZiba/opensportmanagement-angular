import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventsRoutingModule } from "./events-routing.module";
import { SharedModule } from "../shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { EventsState } from "./store";
import { EventListComponent } from "./components/event-list/event-list.component";
import { EventsPageComponent } from "./pages/list/events-page.component";
import { EventItemComponent } from "./components/event-item/event-item.component";
import { EventService } from "./services/event.service";
import { NewEventComponent } from "./components/new-event/new-event.component";
import { NewEventPageComponent } from "./pages/new-event/new-event-page.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    NgxsModule.forFeature([EventsState])
  ],
  providers: [EventService],
  declarations: [
    EventItemComponent,
    EventListComponent,
    EventsPageComponent,
    NewEventComponent,
    NewEventPageComponent
  ]
})
export class EventsModule {}
