import { RootState } from "../store";

export const selectAllUsers = (state: RootState) => state.chats.allUsers;
export const selectRecepient = (state: RootState) => state.chats.recipient;
export const selectActiveChat = (state: RootState) => state.chats.activeChat;
export const selectCurrentMessages = (state: RootState) => state.chats.currentMessages;
export const selectChatLoading = (state: RootState) => state.chats.isLoading;
export const selectAllGroups = (state: RootState) => state.chats.allGroups;
