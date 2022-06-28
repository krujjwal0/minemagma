import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { SET_ALL_DEPARTMENTS, SET_ALL_ROLES, SET_EMPLOYEE, SET_EDIT_USER_DATA } from './constants';

export const initialState = {
  usersList: [],
  usersListreplica: [],
  departmentList: [],
  rolesList: [],
  editUserData:{}
};

/* eslint-disable default-case, no-param-reassign */
const empReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type } = action;
    // console.log('in orgchart reducer ==',action.type,action.payload.Users.map)
    switch (action.type) {
      case SET_EDIT_USER_DATA:
        return {
          ...state,
          editUserData: action.payload
        }
      case SET_ALL_DEPARTMENTS:
        return {
          ...state,
          departmentList: action.payload,
        };
      case SET_ALL_ROLES:
        return {
          ...state,
          rolesList: action.payload,
        };
      case SET_EMPLOYEE:
        if(action.payload.fromSaga === true){
          console.log('in side if ==',action.payload.fromSaga)
          return {
            ...state,
            usersList: action.payload.results.data.users,
            usersListreplica: action.payload.results.data.users,
          };
        } else{
        console.log('in side else ==',action.payload.fromSaga)
        return {
          ...state,
          usersList: action.payload.results,
        };
      }

      default:
        return state;
    }
  });

export default empReducer;
