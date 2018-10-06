import { BrowserModule } from "@angular/platform-browser";
import { InjectionToken, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // <-- NgModel lives here
import {
  MatMomentDateModule,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatRadioModule
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SpeedDialModule } from "./speed-dial";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { EventListComponent } from "./components/event-list/event-list.component";
import { EventService } from "./services/event.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { UserService } from "./services/user.service";
import { ApiUrlInterceptor } from "./urlinterceptor";
import { environment } from "../environments/environment";
import { AuthGuardService } from "./services/auth-guard.service";
import { TeamService } from "./services/team.service";
import { TeamMembersComponent } from "./components/team-members/team-members.component";
import { EventDetailsComponent } from "./components/event-details/event-details.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { CookieService } from "ngx-cookie-service";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MemberInvitationComponent } from "./components/member-invitation/member-invitation.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { StompConfig, StompService } from "@stomp/ng2-stompjs";
import { EventCreationComponent } from "./components/event-creation/event-creation.component";
import { PlaceService } from "./services/place.service";
import { OpponentService } from "./services/opponent.service";
import { TeamCreationComponent } from "./components/team-creation/team-creation.component";
import { PlaceCreationComponent } from "./components/place-creation/place-creation.component";
import { OpponentCreationComponent } from "./components/opponent-creation/opponent-creation.component";
import { AccountConfirmationComponent } from "./components/account-confirmation/account-confirmation.component";
import { SeasonCreationComponent } from "./components/season-creation/season-creation.component";
import { ChampionshipCreationComponent } from "./components/championship-creation/championship-creation.component";
import { LoginSmartComponent } from "./containers/login.container";
import { AccountConfirmationSmartComponent } from "./containers/account-confirmation.container";
import { ChampionshipCreationSmartComponent } from "./containers/championship-creation.container";
import { EventCreationSmartComponent } from "./containers/event-creation.container";
import { EventListSmartComponent } from "./containers/event-list.container";
import { EventDetailsSmartComponent } from "./containers/event-details.container";
import { EventSettingsComponent } from "./components/event-settings/event-settings.component";
import { EventSettingsSmartComponent } from "./containers/event-settings.container";
import { RouteReuseStrategy } from "@angular/router";
import { RouteReuse } from "./RouteReuse";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const API_URL = new InjectionToken<string>("apiUrl");
export const FORMAT_DATE = "YYYY-MM-DD";
export const FORMAT_TIME = "HH:mm";

const stompConfig: StompConfig = {
  url: `wss://${environment.host}:${environment.port}/messagesWS/websocket`,

  // Headers
  // Typical keys: login, passcode, host
  headers: {},

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
    LoginSmartComponent,
    EventListComponent,
    EventListSmartComponent,
    TeamMembersComponent,
    EventDetailsComponent,
    EventDetailsSmartComponent,
    ToolbarComponent,
    UserDetailsComponent,
    MemberInvitationComponent,
    MessagesComponent,
    EventCreationComponent,
    EventCreationSmartComponent,
    TeamCreationComponent,
    PlaceCreationComponent,
    OpponentCreationComponent,
    AccountConfirmationComponent,
    AccountConfirmationSmartComponent,
    SeasonCreationComponent,
    ChampionshipCreationComponent,
    ChampionshipCreationSmartComponent,
    EventSettingsComponent,
    EventSettingsSmartComponent
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
    MatRadioModule,
    // Other modules
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["ns3268474.ip-5-39-81.eu:8090"]
      }
    }),
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    CookieService,
    EventService,
    UserService,
    AuthGuardService,
    TeamService,
    PlaceService,
    OpponentService,
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
      deps: [API_URL]
    },
    StompService,
    { provide: StompConfig, useValue: stompConfig },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: RouteReuseStrategy, useClass: RouteReuse }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
