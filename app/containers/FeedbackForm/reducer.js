import produce from 'immer';
import { SET_FEEDBACK_FORM, SET_SHOW_FEEDBACK_FORM_DATA } from './constants';

export const initialState = {
  secondFeedbackFormData: [],
};
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_FEEDBACK_FORM:
        console.log(
          'inside reducer of feedback form data ===',
          state.secondFeedbackFormData,
        );
        return {
          ...state,
          secondFeedbackFormData: action.payload,
        };

      case SET_SHOW_FEEDBACK_FORM_DATA:
        console.log(
          'on saving data feedback form  Data data ===',
          state.secondFeedbackFormData,
        );
        return {
          ...state,
          // showTableMain: true,
          secondFeedbackFormData: [
            ...state.secondFeedbackFormData,
            action.payload,
          ],
        };

      default:
        return state;
    }
  });

export default loginReducer;
