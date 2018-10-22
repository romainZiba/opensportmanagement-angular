import * as fromLogin from "./login.actions";
import { User } from "../models/user";

describe("Login Actions", () => {
  describe("Login", () => {
    it("should create an action", () => {
      const credentials = { username: "plop", password: "plop" };
      const action = new fromLogin.Login(credentials);
      expect(fromLogin.Login.type).toBe(fromLogin.LoginActionsType.LOGIN);
      expect({ ...action }).toEqual({
        payload: credentials
      });
    });
  });

  describe("LoginSuccess", () => {
    it("should create an action", () => {
      const user = new User("RR", "Romain", "Romain", "rr@rr.fr", "");
      const action = new fromLogin.LoginSuccess(user);
      expect(fromLogin.LoginSuccess.type).toBe(
        fromLogin.LoginActionsType.LOGIN_SUCCESS
      );
      expect({ ...action }).toEqual({
        payload: user
      });
    });
  });

  describe("LoginFailure", () => {
    it("should create an action", () => {
      const error = "error";
      const action = new fromLogin.LoginFailure(error);
      expect(fromLogin.LoginFailure.type).toBe(
        fromLogin.LoginActionsType.LOGIN_FAILURE
      );
      expect({ ...action }).toEqual({
        payload: error
      });
    });
  });

  describe("LoginRedirect", () => {
    it("should create an action", () => {
      const action = new fromLogin.LoginRedirect();
      expect(fromLogin.LoginRedirect.type).toBe(
        fromLogin.LoginActionsType.LOGIN_REDIRECT
      );
      expect({ ...action }).toEqual({});
    });
  });

  describe("Logout", () => {
    it("should create an action", () => {
      const action = new fromLogin.Logout();
      expect(fromLogin.Logout.type).toBe(fromLogin.LoginActionsType.LOGOUT);
      expect({ ...action }).toEqual({});
    });
  });
});
