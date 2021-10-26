import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  databases: {
    loading: boolean;
    error: any;
    data: any;
    isDone: boolean;
  };
}

const initialState: initialState = {
  databases: {
    loading: true,
    error: null,
    data: null,
    isDone: false,
  },
};

export const monitroingSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    successGetDatabases: (state, action) => {
      state.databases = { ...state.databases, data: action.payload, loading: false, isDone: true, error: null };
    },
    failedGetDatabases: (state, action) => {
      state.databases = { ...state.databases, data: null, loading: false, isDone: true, error: action.payload };
    },
    requestToGetDabases: (state) => {
      state.databases = { ...state.databases, data: null, loading: true, isDone: false, error: null };
    },
  },
});

export const {
  successGetDatabases: successGetDatabasesMonitoring,
  requestToGetDabases: requestToGetDabasesMonitoring,
  failedGetDatabases: failedGetDatabasesMonitoring,
} = monitroingSlice.actions;

export default monitroingSlice.reducer;
