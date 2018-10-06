import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamMembersComponent} from './components/team-members/team-members.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {MemberInvitationComponent} from './components/member-invitation/member-invitation.component';
import {MessagesComponent} from './components/messages/messages.component';
import {TeamCreationComponent} from './components/team-creation/team-creation.component';
import {AccountConfirmationSmartComponent} from './containers/account-confirmation.container';
import {EventCreationSmartComponent} from './containers/event-creation.container';
import {OpponentCreationComponent} from './components/opponent-creation/opponent-creation.component';
import {PlaceCreationComponent} from './components/place-creation/place-creation.component';
import {SeasonCreationComponent} from './components/season-creation/season-creation.component';
import {ChampionshipCreationSmartComponent} from './containers/championship-creation.container';
import {EventListSmartComponent} from './containers/event-list.container';
import {EventDetailsSmartComponent} from './containers/event-details.container';
import {EventSettingsSmartComponent} from './containers/event-settings.container';
import {AuthGuardService} from './auth/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/event-list', pathMatch: 'full' },
  { path: 'confirmation', component: AccountConfirmationSmartComponent },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'event-list',
    component: EventListSmartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-training',
    component: EventCreationSmartComponent,
    data: { eventtype: 'training' },
    canActivate: []
  },
  {
    path: 'new-event',
    component: EventCreationSmartComponent,
    data: { eventtype: 'event' },
    canActivate: []
  },
  {
    path: 'new-match',
    component: EventCreationSmartComponent,
    data: { eventtype: 'match' },
    canActivate: []
  },
  {
    path: 'team',
    component: TeamMembersComponent,
    canActivate: []
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: []
  },
  {
    path: 'events/:id',
    component: EventDetailsSmartComponent,
    canActivate: []
  },
  {
    path: 'invite-members',
    component: MemberInvitationComponent,
    canActivate: []
  },
  {
    path: 'events/:id/messages',
    component: MessagesComponent,
    canActivate: []
  },
  {
    path: 'new-team',
    component: TeamCreationComponent,
    canActivate: []
  },
  {
    path: 'new-opponent',
    component: OpponentCreationComponent,
    canActivate: []
  },
  {
    path: 'new-place',
    component: PlaceCreationComponent,
    canActivate: []
  },
  {
    path: 'new-season',
    component: SeasonCreationComponent,
    canActivate: []
  },
  {
    path: 'seasons/:id/new-championship',
    component: ChampionshipCreationSmartComponent,
    canActivate: []
  },
  {
    path: 'events/:id/settings',
    component: EventSettingsSmartComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
