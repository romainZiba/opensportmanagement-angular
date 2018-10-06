import {initialState, reducer} from './login.reducer';
import * as loginActions from '../actions';
import {User} from '../../models/user';

describe("LoginReducer", () => {
  const user = new User(
    "username",
    "firstName",
    "lastName",
    "email",
    "phoneNumber"
  );

  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("login action", () => {
    it("should return pending state", () => {
      const credentials = { username: "username", password: "password" };
      const action = new loginActions.Login(credentials);
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("login success action", () => {
    it("should return logged user", () => {
      const action = new loginActions.LoginSuccess(user);
      const result = reducer(
        { ...initialState, pending: true, error: null },
        action
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe("login failure action", () => {
    it("should return error", () => {
      const error = "error";
      const action = new loginActions.LoginFailure(error);
      const result = reducer(
        { ...initialState, pending: true, error: null },
        action
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe("logout action", () => {
    it("should return initial state", () => {
      const action = new loginActions.Logout();
      const result = reducer({ ...initialState, user }, action);
      expect(result).toMatchSnapshot();
    });
  });
});
