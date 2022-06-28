import produce from 'immer';
import { SET_Q_A } from './constants';

// The initial state of the App
export const initialState = {
  help_Q_A: [],
  helpreplica: [],
};

/* eslint-disable default-case, no-param-reassign */
const helpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_Q_A:
        console.log("SET Q A====",action.payload)
        if(action.payload.fromSaga === true){
          console.log("IF ====",action.payload)
          return {
            ...state,
            help_Q_A: action.payload.results.data.qNa,
            helpreplica: action.payload.results.data.qNa,
          }
        }else{
          console.log("ELSE ====",action.payload)
          return {
            ...state,
            help_Q_A: action.payload.results,
          };
        }
        // return {
        //   ...state,
        //   help: action.payload,
        // };
      default:
        return state;
    }
  });

export default helpReducer;