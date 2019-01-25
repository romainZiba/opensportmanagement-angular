import { AuthGuard } from './../auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './pages/list/events-page.component';
import { NewEventPageComponent } from './pages/new-event/new-event-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: NewEventPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
