import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EventListComponent} from './event-list/event-list.component';
import {AuthGuardService} from './services/auth-guard.service';
import {TeamDetailsComponent} from './team-details/team-details.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MemberInvitationComponent} from './member-invitation/member-invitation.component';
import {MessagesComponent} from './messages/messages.component';
import {EventCreationComponent} from './event-creation/event-creation.component';
import {TeamCreationComponent} from './team-creation/team-creation.component';

const routes: Routes = [
  { path: '', redirectTo: '/event-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuardService] },
  { path: 'new-training', component: EventCreationComponent, data: { eventtype: 'training' }, canActivate: [AuthGuardService] },
  { path: 'new-event', component: EventCreationComponent, data: { eventtype: 'event' }, canActivate: [AuthGuardService] },
  { path: 'new-match', component: EventCreationComponent, data: { eventtype: 'match' }, canActivate: [AuthGuardService] },
  { path: 'team', component: TeamDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'invite-members', component: MemberInvitationComponent, canActivate: [AuthGuardService] },
  { path: 'events/:id/messages', component: MessagesComponent, canActivate: [AuthGuardService] },
  { path: 'new-team', component: TeamCreationComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
