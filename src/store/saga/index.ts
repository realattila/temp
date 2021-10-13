import { all, put, takeLatest, call, fork } from 'redux-saga/effects';
import { getMonitoringDatabasesAPI } from 'services/api/monitoring';
import {
  requestToGetDabasesMonitoring,
  successGetDatabasesMonitoring,
  failedGetDatabasesMonitoring,
} from 'store/monitoring';

function* getDataBasesMonitoring(): Generator {
  const res: any = yield getMonitoringDatabasesAPI();

  if (!res.hasError) {
    yield put(successGetDatabasesMonitoring(res.data));
  } else {
    yield put(failedGetDatabasesMonitoring(res.errorText));
  }
}

function* listToGetDatabseMonitoringRequest() {
  yield takeLatest(requestToGetDabasesMonitoring().type, getDataBasesMonitoring);
}

function* rootSaga() {
  yield all([call(listToGetDatabseMonitoringRequest)]);
}

export default rootSaga;
