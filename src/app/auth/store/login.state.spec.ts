import { async, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs/observable/of";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../services/auth.service";
import { AuthState } from "./login.state";
import { HttpResponse } from "@angular/common/http";
import { Login } from "./login.actions";
import { User } from "../models/user";
import { CookieService } from "ngx-cookie-service";

const error = "error";
const user = new User(
  "username",
  "firstname",
  "lastname",
  "email",
  "phonenumber"
);

const authSuccessResponse = new HttpResponse({
  body: null,
  status: 200
});

const authFailureResponse = new HttpResponse({
  body: error,
  status: 400
});

describe("Login", () => {
  let store: Store;
  let authService: AuthService;
  let cookieService: CookieService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([AuthState])
      ],
      providers: [AuthService, CookieService]
    });

    authService = TestBed.get(AuthService);
    cookieService = TestBed.get(CookieService);
    store = TestBed.get(Store);

    spyOn(authService, "authenticate").and.returnValue(of(authSuccessResponse));
    spyOn(authService, "whoAmI").and.returnValue(of(user));
  });

  it("should change pending to true", async(() => {
    store.dispatch(new Login({ username: user.username, password: "pass" }));
    store.selectOnce(state => state.authState.pending).subscribe(pending => {
      expect(pending).toEqual(true);
    });
  }));
});
