import { createSlice } from "@reduxjs/toolkit";

const initialProfile = { profile: { name: "", password: "", userId: "" } };

export const counterSlice = createSlice({
  name: "profile",
  initialState: {
    profile: initialProfile,
  },
  reducers: {
    profileSave: (state, action) => {
      state.profile = action.payload;
    },
    profileClear: (state) => {
      state.profile = initialProfile;
    },
  },
});

export const { profileSave, profileClear } = counterSlice.actions;

export default counterSlice.reducer;
