import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login.component';
import {LoginPageComponent} from './containers/login-page.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffects} from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [LoginComponent, LoginPageComponent],
  declarations: [LoginPageComponent, LoginComponent]
})
export class AuthModule {}
