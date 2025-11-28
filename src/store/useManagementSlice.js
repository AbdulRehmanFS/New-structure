/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSelectedList: "viewer",
  faqTab: "Terms and Policies",
  audioVideoTab: "audio",
  earning: "events",
};

const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserSelection: (state, action) => {
      state.userSelectedList = action.payload ?? "viewer";
    },
    setFaqTabSelection: (state, action) => {
      state.faqTab = action.payload;
    },
    setAudioVideoTabSelection: (state, action) => {
      state.audioVideoTab = action.payload ?? "audio";
    },
    setEarningTabSelection: (state, action) => {
      state.earning = action.payload ?? "events";
    },
    resetTabSelection: (state) => {
      state.userSelectedList = "viewer";
      state.audioVideoTab = "audio";
      state.earning = "event";
    },
  },
});

export const {
  setUserSelection,
  setFaqTabSelection,
  setAudioVideoTabSelection,
  resetTabSelection,
  setEarningTabSelection,
} = UserSlice.actions;
export default UserSlice.reducer;

