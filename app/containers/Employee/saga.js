/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { HOST, BASE_PATH, SCHEMES, URL } from '../config.json';
import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  GET_ALL_DEPARTMENTS,
  GET_ALL_ROLES,
  SHOW_EMPLOYEE,
} from './constants';
import {
  setAllDepartment,
  setAllRoles,
  setEmployee,
  showEmployee,
} from './actions';

function* getUsersList() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/user/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;

  try {
    console.log('getUsersList get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getUsersList saga', result);
    let obj = {
      fromSaga: true,
      results: result,
    }
    // yield put(setEmployee(result.data.users));
    yield put(setEmployee(obj));
  } catch (err) {
    console.log('Error in getUsersList saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* saveOrUpdateUserSaga(action) {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/user/saveOrUpdate`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL, action.payload);
  let result;

  try {
    console.log('saveOrUpdateUserSaga get ');
    result = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    console.log('success in saveOrUpdateUserSaga saga', result);
    yield put(showEmployee());
  } catch (err) {
    console.log('Error in saveOrUpdateUserSaga saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* getAllDepartmentSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/department/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;

  try {
    console.log('getAllDepartmentSaga get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getAllDepartmentSaga saga', result);
    yield put(setAllDepartment(result.data));
  } catch (err) {
    console.log('Error in getAllDepartmentSaga saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* getAllRolesSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/getallRoles`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;

  try {
    console.log('getAllRolesSaga get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getAllRolesSaga saga', result);
    yield put(setAllRoles(result.data.roles));
  } catch (err) {
    console.log('Error in getAllRolesSaga saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* deleteUserSaga(action) {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/user/${
    action.payload
  }`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL, action.payload);
  let result;

  try {
    console.log('deleteUserSaga get ');
    result = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    console.log('success in deleteUserSaga saga', result);
    yield put(showEmployee());
  } catch (err) {
    console.log('Error in deleteUserSaga saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* usersData() {
  yield takeLatest(SHOW_EMPLOYEE, getUsersList);
  yield takeLatest(ADD_USER, saveOrUpdateUserSaga);
  yield takeLatest(GET_ALL_ROLES, getAllRolesSaga);
  yield takeLatest(GET_ALL_DEPARTMENTS, getAllDepartmentSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(EDIT_USER, saveOrUpdateUserSaga);
}
