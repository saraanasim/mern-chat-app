import { IChat, IGroup, IUser, SocketMessage } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatsSliceType = {
  allUsers: Array<IUser>
  allGroups: Array<IGroup>
  activeChat: IChat | null
  recipient: string | null,
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
    setActiveRecipient: (state, { payload }) => {
      state.recipient = payload;
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
  },
});
export const { setActiveRecipient, setNotifications, setAllUsers, setAllGroups, setChatLoading, setActiveChat, setCurrentMessages } = chatsSlice.actions;
export default chatsSlice.reducer;
