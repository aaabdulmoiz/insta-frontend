import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import counterReducer from "./counter";
import profileReducer from "./profile";
import authReducer from "./auth";
import photoReducer from "./photos";

const reducers = combineReducers({
  counter: counterReducer,
  profile: profileReducer,
  authenticate: authReducer,
  photos: photoReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
