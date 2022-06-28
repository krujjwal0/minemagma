import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';

import request from 'utils/request';
import { HOST, BASE_PATH, SCHEMES, URL } from '../../containers/config.json';
import {
  GET_Q_A,
} from './constants';
import { setQ_A } from './action';
// import { getQ_A } from './action';

function* getQ_A_Saga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/getQandA`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;

  try {
    console.log('generatorFunction get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in Help saga', result);
    let obj = {
      fromSaga: true,
      results: result,
    }
    yield put(setQ_A(obj));
  } catch (err) {
    console.log('Error in Help saga', result, err);
    if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}
export default function* helpData() {
  yield takeLatest(GET_Q_A, getQ_A_Saga);
}