import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadContent: null
};
const ContentSlice = createSlice({
  name: "ContentSlice",
  initialState,
  reducers: {
    setUploadContent: (state, action) => {
      state.uploadContent = action.payload ?? null;
    },
    clearUploadContent: (state, action) => {
      state.uploadContent = action.payload;
    }
  }
});

export const { setUploadContent, clearUploadContent } = ContentSlice.actions;
export default ContentSlice.reducer;

