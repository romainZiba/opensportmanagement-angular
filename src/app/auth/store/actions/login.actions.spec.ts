import * as fromLogin from './login.actions';
import {User} from '../../models/user';

describe('Login Actions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const credentials = { username: 'plop', password: 'plop' };
      const action = new fromLogin.Login(credentials);
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.LOGIN,
        payload: credentials
      });
    });
  });

  describe('LoginSuccess', () => {
    it('should create an action', () => {
      const user = new User('RR', 'Romain', 'Romain', 'rr@rr.fr', '');
      const action = new fromLogin.LoginSuccess(user);
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.LOGIN_SUCCESS,
        payload: user
      });
    });
  });

  describe('LoginFailure', () => {
    it('should create an action', () => {
      const error = 'error';
      const action = new fromLogin.LoginFailure(error);
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.LOGIN_FAILURE,
        payload: error
      });
    });
  });

  describe('LoginRedirect', () => {
    it('should create an action', () => {
      const action = new fromLogin.LoginRedirect();
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.LOGIN_REDIRECT
      });
    });
  });

  describe('LogOut', () => {
    it('should create an action', () => {
      const action = new fromLogin.Logout();
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.LOGOUT
      });
    });
  });

  describe('CheckTokenValid', () => {
    it('should create an action', () => {
      const action = new fromLogin.CheckTokenValid();
      expect({ ...action }).toEqual({
        type: fromLogin.LoginActionsType.CHECK_TOKEN_VALID
      });
    });
  });
});
