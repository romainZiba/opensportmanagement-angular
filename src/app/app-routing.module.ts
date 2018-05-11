import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth-guard.service';
import {TeamDetailsComponent} from './team-details/team-details.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MemberInvitationComponent} from './member-invitation/member-invitation.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'team', component: TeamDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'invite-members', component: MemberInvitationComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
