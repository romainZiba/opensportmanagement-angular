import { NgModule } from '@angular/core';
import { EventsModule } from '../events/events.module';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [EventsModule.forRoot(environment.eventApi)]
})
export class EventsWrapperModule {}
