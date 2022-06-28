import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';

import request from 'utils/request';
import { HOST, BASE_PATH, SCHEMES, URL } from '../../containers/config.json';
import {  
    USER_LOGOUT,
  } from './constants';

  function* getUserLogout() {
    const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/userLogout`;
    console.log('data in saga getUserLogout :', requestURL);
    let result;
  
    try {
      console.log('generatorFunction getUserLogout ');
      result = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${awtToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('success in saga', result);
      let awtToken = localStorage.setItem('awtToken', '');
    } catch (err) {
      console.log('Error in Logging out saga', result, err);
      if (result) {
        console.log(result.status.message);
      } else console.log(err);
    }
  }
  export default function* navData() {
    yield takeLatest(USER_LOGOUT, getUserLogout);
  }
  