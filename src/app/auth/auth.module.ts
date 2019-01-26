import {
  MatRadioModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { AUTH_API_URL, ACCOUNT_API_URL } from './token';
import { AuthHttpService } from './services/auth-http.service';
import { AuthMockService } from './services/auth-mock.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { LoginPageComponent } from './pages/login-page.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store';
import { Api } from '../core/models/api';
import { AuthService } from './services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState])
  ],
  exports: [LoginComponent, LoginPageComponent],
  declarations: [LoginPageComponent, LoginComponent]
})
export class AuthModule {
  public static forRoot(authApi: Api, accountApi: Api): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AuthService,
          useClass: authApi.useMock ? AuthMockService : AuthHttpService
        },
        {
          provide: AUTH_API_URL,
          useValue: authApi.baseUrl
        },
        {
          provide: ACCOUNT_API_URL,
          useValue: accountApi.baseUrl
        }
      ]
    };
  }
}
