import {
  SHOW_EMPLOYEE,
  SET_EMPLOYEE,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  GET_ALL_ROLES,
  GET_ALL_DEPARTMENTS,
  SET_ALL_ROLES,
  SET_ALL_DEPARTMENTS,
  SET_EDIT_USER_DATA
} from './constants';

export function showEmployee(obj) {
  console.log('employeeList added:-', obj);
  return {
    type: SHOW_EMPLOYEE,
    payload: obj,
  };
}

export function setEmployee(obj) {
  console.log('employeeList added:-', obj);
  return {
    type: SET_EMPLOYEE,
    payload: obj,
  };
}
export function addUser(obj) {
  console.log('Add User:-', obj);
  return {
    type: ADD_USER,
    payload: obj,
  };
}

export function editUser(obj) {
  console.log('EDIT User:-', obj);
  return {
    type: EDIT_USER,
    payload: obj,
  };
}

export function deleteUser(data) {
  console.log('DELETE User:-', data);
  return {
    type: DELETE_USER,
    payload: data,
  };
}

export function getAllRoles() {
  console.log('GET ROLES ALL:-');
  return {
    type: GET_ALL_ROLES,
  };
}

export function getAllDepartment() {
  console.log('Get all depts:-');
  return {
    type: GET_ALL_DEPARTMENTS,
  };
}
export function setAllRoles(data) {
  console.log('SET ROLES ALL:-');
  return {
    type: SET_ALL_ROLES,
    payload: data,
  };
}

export function setAllDepartment(data) {
  console.log('Set all depts:-');
  return {
    type: SET_ALL_DEPARTMENTS,
    payload: data,
  };
}
export function setEditUserData(data) {
  console.log('set EditUser Data:-');
  return {
    type: SET_EDIT_USER_DATA,
    payload: data,
  };
}
