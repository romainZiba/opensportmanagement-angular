import * as fromLogin from "./login.actions";
import { User } from "../models/user";

describe("Login Actions", () => {
  describe("Login", () => {
    it("should create an action", () => {
      const credentials = { username: "plop", password: "plop" };
      const action = new fromLogin.Login(credentials);
      expect({ ...action }).toEqual({
        payload: credentials
      });
    });
  });

  describe("LoginSuccess", () => {
    it("should create an action", () => {
      const user = new User("RR", "Romain", "Romain", "rr@rr.fr", "");
      const action = new fromLogin.LoginSuccess(user);
      expect({ ...action }).toEqual({
        payload: user
      });
    });
  });

  describe("LoginFailure", () => {
    it("should create an action", () => {
      const error = "error";
      const action = new fromLogin.LoginFailure(error);
      expect({ ...action }).toEqual({
        payload: error
      });
    });
  });

  describe("LoginRedirect", () => {
    it("should create an action", () => {
      const action = new fromLogin.LoginRedirect();
      expect({ ...action }).toEqual({});
    });
  });

  describe("LogOut", () => {
    it("should create an action", () => {
      const action = new fromLogin.Logout();
      expect({ ...action }).toEqual({});
    });
  });

  describe("CheckTokenValid", () => {
    it("should create an action", () => {
      const action = new fromLogin.CheckTokenValid();
      expect({ ...action }).toEqual({});
    });
  });
});
