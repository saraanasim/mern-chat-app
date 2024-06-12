import { IChat, IGroup, IUser } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatsSliceType = {
  allUsers: Array<IUser>
  allGroups: Array<IGroup>
  activeChat:IChat | null
  recipient: string | null,
  isLoading: boolean,
  notifications: Array<any>,
}
const initialState: ChatsSliceType = {
  allUsers: [],
  allGroups: [],
  activeChat:null,
  recipient: null,
  isLoading: false,
  notifications: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatLoading: (state, { payload }:PayloadAction<ChatsSliceType['isLoading']>) => {
      state.isLoading = payload;
    },
    setActiveRecipient: (state, { payload }) => {
      state.recipient = payload;
    },
    setActiveChat: (state, { payload }:PayloadAction<ChatsSliceType['activeChat']>) => {
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
export const { setActiveRecipient, setNotifications, setAllUsers, setAllGroups,setChatLoading,setActiveChat } = chatsSlice.actions;
export default chatsSlice.reducer;
