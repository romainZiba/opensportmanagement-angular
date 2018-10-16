import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsPageComponent} from './pages/list/events-page.component';
import {AuthGuardService} from '../auth/services/auth-guard.service';

const routes: Routes = [
  { path: "", component: EventsPageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
