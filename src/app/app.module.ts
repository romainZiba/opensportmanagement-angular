import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatInputModule, MatListModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './/app-routing.module';
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

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const API_URL = new InjectionToken<string>('apiUrl');

registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TeamDetailsComponent
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
    })
  ],
  providers: [
    EventService,
    UserService,
    AuthGuardService,
    TeamService,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
