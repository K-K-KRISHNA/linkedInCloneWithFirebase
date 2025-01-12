import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/UsersSlice";

export const store = configureStore({
  reducer: {
    usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
