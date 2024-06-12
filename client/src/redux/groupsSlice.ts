import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
  showNotifications: false,
};
const groupsSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowProfile: (state, { payload }) => {
      state.showProfile = payload;
    },
    setShowNotifications: (state, { payload }) => {
      state.showNotifications = payload;
    },
  },
});
export const { setShowProfile, setShowNotifications } = groupsSlice.actions;
export default groupsSlice.reducer;
