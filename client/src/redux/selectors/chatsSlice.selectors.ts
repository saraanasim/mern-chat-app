import { RootState } from "../store";

export const selectAllUsers = (state: RootState) => state.chats.allUsers;
export const selectRecepient = (state: RootState) => state.chats.recipient;
export const selectActiveChat = (state: RootState) => state.chats.activeChat;
export const selectAllGroups = (state: RootState) => state.chats.allGroups;
