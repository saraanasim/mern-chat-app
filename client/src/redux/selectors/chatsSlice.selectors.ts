import { RootState } from "../store";

export const selectAllUsers = (state: RootState) => state.chats.allUsers;