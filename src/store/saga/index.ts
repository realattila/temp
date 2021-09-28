import { all, put, takeLatest, call, fork } from 'redux-saga/effects';
import { showAsideDashboard } from 'store/dashboard';

function* rootSaga() {
  yield all([]);
}

export default rootSaga;
