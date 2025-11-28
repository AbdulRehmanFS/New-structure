import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "@features/auth/store/signInSlice";
import sidebarSlice from "@features/common/store/sidebarSlice";
import UserSlice from "@features/userManagement/store/useManagementSlice";
import ContentSlice from "@features/content/store/contentSlice";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default reduxstore;
export const persistor = persistStore(reduxstore);

