


import {
  GET_Q_A,
  SET_Q_A
} from './constants';

export function getQ_A() {
  return {
    type: GET_Q_A,
  };
}
export function setQ_A(data) {
  console.log("SET Q A====",data)
  return {
    type: SET_Q_A,
    payload: data
  };
}