import * as fromLayout from './layout.actions';

describe('Sidenav Actions', () => {
  describe('Open sidenave', () => {
    it('should create an action', () => {
      const action = new fromLayout.OpenSidenav();
      expect(fromLayout.OpenSidenav.type).toBe(fromLayout.SidenavActionsType.OPEN_SIDENAV);
      expect({ ...action }).toEqual({});
    });
  });

  describe('Close Sidenav', () => {
    it('should create an action', () => {
      const action = new fromLayout.CloseSidenav();
      expect(fromLayout.CloseSidenav.type).toBe(fromLayout.SidenavActionsType.CLOSE_SIDENAV);
      expect({ ...action }).toEqual({});
    });
  });
});
