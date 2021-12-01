import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import profileReducer from "./profile";
import authReducer from "./auth";
import photoReducer from "./photos";

export default configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    authenticate: authReducer,
    photos: photoReducer,
  },
});
