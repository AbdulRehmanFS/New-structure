/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const Authentication = createSlice({
  name: "Authlogin",
  initialState,
  reducers: {
    authlogin: (state, action) => {
      state.data = action.payload;
    },
    authlogout: (state, action) => {
      state.data = action.payload || {};
    },
  },
});
export const { authlogin, authlogout } = Authentication.actions;
export default Authentication.reducer;

