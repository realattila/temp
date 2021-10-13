import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import dashboardReducer from 'store/dashboard/index';

import mySaga from 'store/saga';
import monitoringReducer from 'store/monitoring/index';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    monitroing: monitoringReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
