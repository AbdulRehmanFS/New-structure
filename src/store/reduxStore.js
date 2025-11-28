import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "./signInSlice";
import sidebarSlice from "./sidebarSlice";
import UserSlice from "./useManagementSlice";
import ContentSlice from "./contentSlice";

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

