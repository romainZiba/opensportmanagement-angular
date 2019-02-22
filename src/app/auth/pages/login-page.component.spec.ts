import { AuthState } from './../store/login.state';
import { CookieService } from 'ngx-cookie-service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { Store, NgxsModule } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [NgxsModule.forRoot([AuthState])],
      providers: [
        { provide: AuthService, useValue: null },
        { provide: CookieService, useValue: null }
      ]
    });
    TestBed.overrideComponent(LoginPageComponent, {
      set: {
        template: `<p>{{ loggingIn$ | async }}</p>
                <p>{{ error$ | async }}</p>'`
      }
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'loggingIn$', { writable: true });
    component.loggingIn$ = of(true);
    Object.defineProperty(component, 'error$', { writable: true });
    component.error$ = of('error');
    fixture.detectChanges();
  });

  it('should ne logging in', async(() => {
    expect(fixture).toMatchSnapshot();
  }));
});
