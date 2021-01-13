import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    selectedImage: null,
    user: null,
  },
  reducers: {
    saveSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectedImage: (state) => {
      state.selectedImage = null;
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  saveSelectedImage,
  resetSelectedImage,
  saveUser,
  resetUser,
} = appSlice.actions;

export const selectSavedImage = (state) => state.app.selectedImage;
export const selectLoggedUser = (state) => state.app.user;

export default appSlice.reducer;
