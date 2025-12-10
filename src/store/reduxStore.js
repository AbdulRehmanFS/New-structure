import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "store/signInSlice";
import sidebarSlice from "store/sidebarSlice";
import UserSlice from "store/useManagementSlice";
import ContentSlice from "store/contentSlice";

const reducers = combineReducers({
  signIn: Authentication,
  sidebar: sidebarSlice,
  userManagement: UserSlice,
  content: ContentSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const reduxstore = configureStore({
  reducer: persistedReducer,
});

export default reduxstore;
export const persistor = persistStore(reduxstore);
