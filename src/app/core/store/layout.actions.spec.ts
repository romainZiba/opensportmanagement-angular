import * as fromLayout from "./layout.actions";

describe("Sidenav Actions", () => {
  describe("Open sidenave", () => {
    it("should create an action", () => {
      const action = new fromLayout.OpenSidenav();
      expect({ ...action }).toEqual({});
    });
  });

  describe("Close Sidenav", () => {
    it("should create an action", () => {
      const action = new fromLayout.CloseSidenav();
      expect({ ...action }).toEqual({});
    });
  });
});
