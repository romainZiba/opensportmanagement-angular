import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from './components/event-list/event-list.component';
import {AuthGuardService} from './services/auth-guard.service';
import {TeamMembersComponent} from './components/team-members/team-members.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {MemberInvitationComponent} from './components/member-invitation/member-invitation.component';
import {MessagesComponent} from './components/messages/messages.component';
import {EventCreationComponent} from './components/event-creation/event-creation.component';
import {TeamCreationComponent} from './components/team-creation/team-creation.component';
import {AccountConfirmationComponent} from './components/account-confirmation/account-confirmation.component';
import {LoginSmartComponent} from './containers/login.container';

const routes: Routes = [
  { path: '', redirectTo: '/event-list', pathMatch: 'full' },
  { path: 'login', component: LoginSmartComponent },
  { path: 'confirmation', component: AccountConfirmationComponent },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuardService] },
  { path: 'new-training', component: EventCreationComponent, data: { eventtype: 'training' }, canActivate: [AuthGuardService] },
  { path: 'new-event', component: EventCreationComponent, data: { eventtype: 'event' }, canActivate: [AuthGuardService] },
  { path: 'new-match', component: EventCreationComponent, data: { eventtype: 'match' }, canActivate: [AuthGuardService] },
  { path: 'team', component: TeamMembersComponent, canActivate: [AuthGuardService] },
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
