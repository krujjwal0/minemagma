/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SET_EMAIL_ID,
  GENERATE_OTP,
  SET_ROLE_TYPE,
  SET_OTP,
  VALIDATE_OTP,
  SIGN_IN,
  SET_USERNAME,
  GET_ADMIN_LOCATIONS,
  SET_ADMIN_LOCATIONS,
  SET_SHOW_OTP_PAGE,
  SET_USER_DATA,
  GET_FEEDBACK_FORM,
  SET_FEEDBACK_FORM,
  SAVE_FEEDBACK_FORM_DATA,
  SET_SHOW_FEEDBACK_FORM_DATA,
  SET_INITIAL_STATE,
  EMAIL_ERROR,
  SET_SHOW_FEEDBACK_FORM_RADIO_DATA,
  OTP_ERROR,
  SHOW_OTP_ERROR_POPUP,
  DOWNLOAD_PROFILE_IMAGE,
} from './constants';
import {
  USER_LOGOUT,
} from './constants';

export const setFeedbackRadioCheck = (questionId, selectedOptionId) => {
  return {
    type: SET_SHOW_FEEDBACK_FORM_RADIO_DATA,
    questionId: questionId,
    selectedOptionId: selectedOptionId
  }
}
export function setInitialState() {
  return {
    type: SET_INITIAL_STATE
  }
}
export function getUserLogout() {
  return {
    type: USER_LOGOUT,
  };
}
export function generateOtpByEmailIdAction(email) {
  console.log('Action login');
  return {
    type: GENERATE_OTP,
    payload: email,
  };
}
export function setRoleTypeAction(roleType) {
  console.log('setRoleTypeAction', roleType);
  return {
    type: SET_ROLE_TYPE,
    payload: roleType,
  };
}
export function setOtpAction(otp) {
  console.log('setOtpAction', otp);
  return {
    type: SET_OTP,
    payload: otp,
  };
}
export function validateOtpAction(otp) {
  console.log('Action validateOtpAction');
  return {
    type: VALIDATE_OTP,
    payload: otp,
  };
}
export function signIn(data) {
  console.log('Action signIn', data);
  return {
    type: SIGN_IN,
    payload: data,
  };
}
export function setEmailId(data) {
  console.log('Action setEmailId', data);
  return {
    type: SET_EMAIL_ID,
    payload: data,
  };
}
export function setUsername(data) {
  console.log('Action setUsername', data);
  return {
    type: SET_USERNAME,
    payload: data,
  };
}
export function getAdminLocationsAction(data) {
  console.log('Action getAdminLocationsAction', data);
  return {
    type: GET_ADMIN_LOCATIONS,
    payload: data,
  };
}
export function setAdminLocationsAction(data) {
  console.log('Action setAdminLocationsAction', data);
  return {
    type: SET_ADMIN_LOCATIONS,
    payload: data,
  };
}
export function setShowOtpPage(data) {
  return {
    type: SET_SHOW_OTP_PAGE,
    payload: data,
  };
}
export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}
export function getFeedbackFormData(data) {
  console.log('Action getFeedbackFormData', data);
  return {
    type: GET_FEEDBACK_FORM,
    payload: data,
  };
}
export function setFeedbackFormData(data) {
  console.log('Action setFeedbackFormData', data);
  return {
    type: SET_FEEDBACK_FORM,
    payload: data,
  };
}
export function saveDataFeedbackForm(data) {
  console.log('saveDataFeedbackForm Data', data);
  return {
    type: SAVE_FEEDBACK_FORM_DATA,
    payload: data,
  };
}
export function setShowToFeedBackPage(data) {
  console.log('setShowToFeedBackPage Data', data);
  return {
    type: SET_SHOW_FEEDBACK_FORM_DATA,
    payload: data,
  };
}
export function checkEmailError(data) {
  console.log('Email validating', data);
  return {
    type: EMAIL_ERROR,
    payload: data
  };
}

export function onOtpError(data) {
  console.log('OTP Error', data);
  return {
    type: OTP_ERROR,
    payload: data
  }
}

export function showOtpErrorPopupAction(data) {
  console.log('OtpErrorPopup', data);
  return {
    type: SHOW_OTP_ERROR_POPUP,
    payload: data
  }
}

export function downloadProfileImageAction() {
  return {
    type: DOWNLOAD_PROFILE_IMAGE
  }
}