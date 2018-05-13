import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatInputModule, MatListModule, MatPaginatorModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SpeedDialModule} from './speed-dial';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventService} from './event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {UserService} from './user.service';
import {ApiUrlInterceptor} from './urlinterceptor';
import {environment} from '../environments/environment';
import {AuthGuardService} from './auth-guard.service';
import {TeamService} from './team.service';
import {TeamDetailsComponent} from './team-details/team-details.component';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {EventDetailsComponent} from './event-details/event-details.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {CookieService} from 'ngx-cookie-service';
import {UserDetailsComponent} from './user-details/user-details.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MemberInvitationComponent} from './member-invitation/member-invitation.component';
import {MessagesComponent} from './messages/messages.component';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const API_URL = new InjectionToken<string>('apiUrl');

registerLocaleData(localeFr, 'fr');

const stompConfig: StompConfig = {
  url: `wss://${environment.host}:${environment.port}/messagesWS/websocket`,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TeamDetailsComponent,
    EventDetailsComponent,
    ToolbarComponent,
    UserDetailsComponent,
    MemberInvitationComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    // Material modules
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatPaginatorModule,
    SpeedDialModule,
    MatSnackBarModule,
    // Other modules
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['ns3268474.ip-5-39-81.eu:8090']
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CookieService,
    EventService,
    UserService,
    AuthGuardService,
    TeamService,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL]},
    StompService,
    {provide: StompConfig, useValue: stompConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
