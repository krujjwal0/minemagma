/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectRoleType = () =>
  createSelector(
    selectLogin,
    loginState => loginState.ROLE_TYPE,
  );
const makeSelectOtp = () =>
  createSelector(
    selectLogin,
    loginState => loginState.otp,
  );
const makeSelectEmailId = () =>
  createSelector(
    selectLogin,
    loginState => loginState.emailId,
  );

export { selectLogin, makeSelectRoleType, makeSelectOtp, makeSelectEmailId };
