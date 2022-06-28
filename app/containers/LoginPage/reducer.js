/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

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
  SET_INITIAL_STATE,
  EMAIL_ERROR,
  SET_SHOW_FEEDBACK_FORM_RADIO_DATA,
  OTP_ERROR,
  SHOW_OTP_ERROR_POPUP,
} from './constants';

// The initial state of the App
export const initialState = {
  ROLE_TYPE: '',
  userIsAuthenticated: false,
  userData: {},
  otp: '',
  otpError: '',
  emailId: 'rsinha488@gmail.com',
  userName: '',
  showOtpPage: false,
  showSuccessPage: false,
  showFeedback: false,
  adminLocations: [],
  feedbackFormData: [{ question: "", options: [{ description: '' }] }],
  feedbackRadioCheck: [],
  // feedbackFormData: ['check question'],
  emailError: '',
  showOtpErrorPopup: { status: false, msg: "" }
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_OTP_ERROR_POPUP:
        console.log('Show OTP Error Popup', action.payload)
        return {
          ...state,
          showOtpErrorPopup: action.payload
        }
      case OTP_ERROR:
        console.log('OTP Error', action.payload)
        return {
          ...state,
          otpError: action.payload
        }
      case EMAIL_ERROR:
        console.log('email Error', action.payload)
        return {
          ...state,
          emailError: action.payload
        }
      case SET_SHOW_FEEDBACK_FORM_RADIO_DATA:
        console.log("hey===", action)
        return {
          ...state,
          feedbackRadioCheck: [...state.feedbackRadioCheck, {
            questionId: action.questionId,
            selectedOptionId: action.selectedOptionId
          }],
          // feedbackRadioCheck: {
          //   questionId: action.questionId,
          //   selectedOptionId: action.selectedOptionId
          // }
        }
      case SET_INITIAL_STATE:
        return {
          state: initialState
        }
      case SET_ADMIN_LOCATIONS:
        console.log(action.payload);
        return {
          ...state,
          adminLocations: action.payload.locations,
        };
      case SET_EMAIL_ID:
        // console.log(action.payload);

        // state.loginReducer.showOtpPage=true;
        return {
          ...state,
          emailId: action.payload,
        };
      case SET_ROLE_TYPE:
        // Delete prefixed '@' from the github username
        return {
          ...state,
          ROLE_TYPE: action.payload,
        };
      case SET_OTP:
        return {
          ...state,
          otp: action.payload,
          showOtpPage: true,
        };

      case SET_SHOW_OTP_PAGE:
        return {
          ...state,
          showOtpPage: action.payload,
        };
      case SET_USERNAME:
        return {
          ...state,
          userName: action.payload,
        };
      case SET_USER_DATA:
        return {
          ...state,
          userData: action.payload,
          userIsAuthenticated: true,
          showFeedback: action.payload.feedbackCompleted,
          showSuccessPage: true,
        };

      case SET_FEEDBACK_FORM:
        console.log('inside reducer of feedback form data ===', action.payload);
        return {
          ...state,
          feedbackFormData: action.payload.qNo
        };

      case SET_SHOW_FEEDBACK_FORM_DATA:
        console.log(
          'on saving data feedback form  Data data ===',
          state.feedbackFormData,
        );
        return {
          ...state,
          // showTableMain: true,
          feedbackFormData: [...state.feedbackFormData, action.payload],
        };
      // case SEARCH_FILTER:
      //   console.log('inside reducer Employee data list ===', state.EmployeeData)
      //   return {
      //     ...state,
      //     EmployeeData: action.EmployeeData.filter

      //   }
      default:
        return state;
    }
  });

export default loginReducer;
