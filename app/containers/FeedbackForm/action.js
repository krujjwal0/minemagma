import {
  GET_SECOND_FEEDBACK_FORM,
  SET_SECOND_FEEDBACK_FORM,
  SAVE_SECOND_FEEDBACK_FORM_DATA,
  SET_SHOW_SECOND_FEEDBACK_FORM_DATA,
} from './constants';

export function getSecondFeedbackFormData(data) {
  console.log('Action getFeedbackFormData', data);
  return {
    type: GET_SECOND_FEEDBACK_FORM,
    payload: data,
  };
}
export function setSecondFeedbackFormData(data) {
  console.log('Action setFeedbackFormData', data);
  return {
    type: SET_SECOND_FEEDBACK_FORM,
    payload: data,
  };
}
export function saveDataSecondFeedbackForm(data) {
  console.log('Action save FeedbackForm Data', data);
  return {
    type: SAVE_SECOND_FEEDBACK_FORM_DATA,
    payload: data,
  };
}
export function setShowToSecondFeedBackPage(data) {
  console.log('Action save FeedbackForm Data', data);
  return {
    type: SET_SHOW_SECOND_FEEDBACK_FORM_DATA,
    payload: data,
  };
}
