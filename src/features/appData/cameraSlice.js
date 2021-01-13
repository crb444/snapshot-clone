import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    image: 0,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    resetImage: (state) => {
      state.image = null;
    },
  },
});

export const { setImage, resetImage } = cameraSlice.actions;

export const selectImage = (state) => state.camera.image;

export default cameraSlice.reducer;
