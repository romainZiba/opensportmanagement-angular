import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatRadioModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SpeedDialModule} from './speed-dial';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {EventListComponent} from './event-list/event-list.component';
import {EventService} from './services/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {UserService} from './services/user.service';
import {ApiUrlInterceptor} from './urlinterceptor';
import {environment} from '../environments/environment';
import {AuthGuardService} from './services/auth-guard.service';
import {TeamService} from './services/team.service';
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
import {EventCreationComponent} from './event-creation/event-creation.component';
import {AmazingTimePickerModule} from './atp-library/atp-time-picker.module';
import {PlaceService} from './services/place.service';
import {OpponentService} from './services/opponent.service';
import {TeamCreationComponent} from './team-creation/team-creation.component';
import {PlaceCreationComponent} from './place-creation/place-creation.component';
import { OpponentCreationComponent } from './opponent-creation/opponent-creation.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const API_URL = new InjectionToken<string>('apiUrl');

registerLocaleData(localeFr, 'fr');

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

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
    EventListComponent,
    TeamDetailsComponent,
    EventDetailsComponent,
    ToolbarComponent,
    UserDetailsComponent,
    MemberInvitationComponent,
    MessagesComponent,
    EventCreationComponent,
    TeamCreationComponent,
    PlaceCreationComponent,
    OpponentCreationComponent,
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
    MatDatepickerModule,
    MatMomentDateModule,
    AmazingTimePickerModule,
    MatRadioModule,
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
    PlaceService,
    OpponentService,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL]},
    StompService,
    {provide: StompConfig, useValue: stompConfig},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [
    PlaceCreationComponent,
    OpponentCreationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
