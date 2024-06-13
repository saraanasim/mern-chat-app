import { IChat, IGroup, IMessage, IUser, SocketMessage } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatsSliceType = {
  allUsers: Array<IUser>
  allGroups: Array<IGroup>
  activeChat: IChat | null
  recipient: IUser | null,
  isLoading: boolean,
  notifications: Array<any>,
  currentMessages: SocketMessage[]
}
const initialState: ChatsSliceType = {
  allUsers: [],
  allGroups: [],
  activeChat: null,
  recipient: null,
  isLoading: false,
  notifications: [],
  currentMessages: []
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatLoading: (state, { payload }: PayloadAction<ChatsSliceType['isLoading']>) => {
      state.isLoading = payload;
    },
    setCurrentMessages: (state, { payload }: PayloadAction<SocketMessage>) => {
      const isDuplicate = state.currentMessages.find(each => each.messageId === payload.messageId)
      if (isDuplicate) return
      state.currentMessages = [...state.currentMessages, payload]
    },
    setActiveRecipient: (state, { payload }: { payload: string }) => {
      const user = state.allUsers.find((each) => each._id === payload)
      if (!user) return
      state.recipient = user;
    },
    setActiveChat: (state, { payload }: PayloadAction<ChatsSliceType['activeChat']>) => {
      state.activeChat = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
    setAllChats: (state, { payload }) => {
      state.notifications = payload;
    },
    setAllUsers: (state, { payload }: PayloadAction<ChatsSliceType['allUsers']>) => {
      state.allUsers = payload;
    },
    setAllGroups: (state, { payload }: PayloadAction<ChatsSliceType['allGroups']>) => {
      state.allGroups = payload;
    },
    resetChat: (state) => {
      state.activeChat = initialState.activeChat;
      state.currentMessages = initialState.currentMessages
      state.recipient=initialState.recipient
    },
    setChatMessages: (state, { payload }: { payload: IMessage[] }) => {
      const convertedMessages: SocketMessage[] = payload.map(({ chatId, message, sender, _id }) => ({ chat: chatId, message, sender, messageId: _id }))
      state.currentMessages = convertedMessages;
    },

  },
});
export const {
  setActiveRecipient,
  setNotifications,
  setAllUsers,
  setAllGroups,
  setChatLoading,
  setActiveChat,
  setCurrentMessages,
  resetChat,
  setChatMessages
} = chatsSlice.actions;
export default chatsSlice.reducer;
