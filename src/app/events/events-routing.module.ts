import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './pages/list/events-page.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { NewEventPageComponent } from './pages/new-event/new-event-page.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-event',
    component: NewEventPageComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
