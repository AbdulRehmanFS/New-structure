import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "Dashboard"
};

const SidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    sidebarSelection: (state, action) => {
      state.selectedTab = action.payload ?? "Dashboard";
    }
  }
});

export const { sidebarSelection } = SidebarSlice.actions;
export default SidebarSlice.reducer;
