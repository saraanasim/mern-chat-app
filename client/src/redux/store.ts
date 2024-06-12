import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./activeUserSlice";
import chatsSlice from "./chatsSlice";
import groupsSlice from "./groupsSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    groups: groupsSlice,
    chats: chatsSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
