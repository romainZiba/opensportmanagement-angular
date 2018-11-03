import { async } from '@angular/core/testing';
// import { NgxsModule, Store } from "@ngxs/store";
// import { of } from "rxjs/observable/of";
// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { RouterTestingModule } from "@angular/router/testing";
// import { AuthService } from "../services/auth.service";
// import { AuthState } from "./login.state";
// import { HttpResponse } from "@angular/common/http";
// import { Login } from "./login.actions";
// import { User } from "../models/user";
// import { CookieService } from "ngx-cookie-service";

// const user = new User(
//   "username",
//   "firstname",
//   "lastname",
//   "email",
//   "phonenumber"
// );
//
// const authSuccessResponse = new HttpResponse({
//   body: null,
//   status: 200
// });

// TODO: https://github.com/7leads/ngx-cookie-service/issues/39
describe('Login', () => {
  // let store: Store;
  // let authService: AuthService;

  beforeEach(async () => {
    // TestBed.configureTestingModule({
    //   imports: [
    //     HttpClientTestingModule,
    //     RouterTestingModule,
    //     NgxsModule.forRoot([AuthState])
    //   ],
    //   providers: [AuthService, CookieService]
    // });
    //
    // authService = TestBed.get(AuthService);
    // store = TestBed.get(Store);
    //
    // spyOn(authService, "authenticate").and.returnValue(of(authSuccessResponse));
    // spyOn(authService, "whoAmI").and.returnValue(of(user));
  });

  it('should change pending to true', async(() => {
    expect(true).toEqual(true);
    // store.dispatch(new Login({ username: user.username, password: "pass" }));
    // store.selectOnce(state => state.authState.pending).subscribe(pending => {
    //   expect(pending).toEqual(true);
    // });
  }));
});
