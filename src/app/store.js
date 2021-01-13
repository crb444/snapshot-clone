import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appData/appSlice";
import cameraReducer from "../features/appData/cameraSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    camera: cameraReducer,
  },
});
