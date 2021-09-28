import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  toggleAside: boolean;
}

const initialState: initialState = {
  toggleAside: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.toggleAside = !state.toggleAside;
    },
    showAside: (state) => {
      state.toggleAside = true;
    },
    hideAside: (state) => {
      state.toggleAside = false;
    },
  },
});

export const {
  toggleAside: toggleAsideDashboard,
  showAside: showAsideDashboard,
  hideAside: hideAsideDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
