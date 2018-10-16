import { BrowserModule } from "@angular/platform-browser";
import { InjectionToken, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // <-- NgModel lives here
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { ApiUrlInterceptor } from "./urlinterceptor";
import { environment } from "../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { StompConfig, StompService } from "@stomp/ng2-stompjs";
import { RouteReuseStrategy } from "@angular/router";
import { RouteReuse } from "./RouteReuse";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const API_URL = new InjectionToken<string>("apiUrl");

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

export const COMPONENTS = [AppComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    }),
    AuthModule,
    CoreModule,
    SharedModule,

    NgxsModule.forRoot([]),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    CookieService,
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
