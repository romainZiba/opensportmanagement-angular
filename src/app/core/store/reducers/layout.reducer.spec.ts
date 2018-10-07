import { initialState, reducer } from "./layout.reducer";
import * as layoutActions from "../actions";

describe("LayoutReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("open sidenav action", () => {
    it("should return sidenav open", () => {
      const action = new layoutActions.OpenSidenav();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe("close sidenav", () => {
    it("should return closed sidenav", () => {
      const action = new layoutActions.CloseSidenav();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
});
