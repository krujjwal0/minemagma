
import produce from 'immer';
import {
  SET_EMAIL_ID,
  SET_ROLE_TYPE,
  SET_OTP,
  SET_USERNAME,
  SET_ADMIN_LOCATIONS,
  SET_SHOW_OTP_PAGE,
  SET_USER_DATA,
  SET_FEEDBACK_FORM,
  SET_SHOW_FEEDBACK_FORM_DATA,
} from './constants';

// The initial state of the App
export const initialState = {
  ROLE_TYPE: '',
};

/* eslint-disable default-case, no-param-reassign */
const navReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
        default:
            return state;
        }
      });
    
    export default navReducer;
    