import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from './components/event-list/event-list.component';
import {AuthGuardService} from './services/auth-guard.service';
import {TeamMembersComponent} from './components/team-members/team-members.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {MemberInvitationComponent} from './components/member-invitation/member-invitation.component';
import {MessagesComponent} from './components/messages/messages.component';
import {TeamCreationComponent} from './components/team-creation/team-creation.component';
import {LoginSmartComponent} from './containers/login.container';
import {AccountConfirmationSmartComponent} from './containers/account-confirmation.container';
import {EventCreationSmartComponent} from './containers/event-creation.container';
import {OpponentCreationComponent} from './components/opponent-creation/opponent-creation.component';
import {PlaceCreationComponent} from './components/place-creation/place-creation.component';
import {SeasonCreationComponent} from './components/season-creation/season-creation.component';
import {ChampionshipCreationSmartComponent} from './containers/championship-creation.container';

const routes: Routes = [
  { path: '', redirectTo: '/event-list', pathMatch: 'full' },
  { path: 'login', component: LoginSmartComponent },
  { path: 'confirmation', component: AccountConfirmationSmartComponent },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuardService] },
  { path: 'new-training', component: EventCreationSmartComponent, data: { eventtype: 'training' }, canActivate: [AuthGuardService] },
  { path: 'new-event', component: EventCreationSmartComponent, data: { eventtype: 'event' }, canActivate: [AuthGuardService] },
  { path: 'new-match', component: EventCreationSmartComponent, data: { eventtype: 'match' }, canActivate: [AuthGuardService] },
  { path: 'team', component: TeamMembersComponent, canActivate: [AuthGuardService] },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'invite-members', component: MemberInvitationComponent, canActivate: [AuthGuardService] },
  { path: 'events/:id/messages', component: MessagesComponent, canActivate: [AuthGuardService] },
  { path: 'new-team', component: TeamCreationComponent, canActivate: [AuthGuardService] },
  { path: 'new-opponent', component: OpponentCreationComponent, canActivate: [AuthGuardService] },
  { path: 'new-place', component: PlaceCreationComponent, canActivate: [AuthGuardService] },
  { path: 'new-season', component: SeasonCreationComponent, canActivate: [AuthGuardService] },
  { path: 'seasons/:id/new-championship', component: ChampionshipCreationSmartComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
