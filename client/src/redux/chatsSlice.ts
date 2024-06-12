import { IUser } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ChatsSliceType={
  allUsers:Array<IUser>
  allChats: Array<any>,
  activeChat: string,
  isLoading: boolean,
  notifications: Array<any>,
}
const initialState:ChatsSliceType = {
  allUsers:[],
  allChats: [],
  activeChat: '',
  isLoading: false,
  notifications: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setActiveChat: (state, { payload }) => {
      state.activeChat = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
    setAllChats: (state, { payload }) => {
      state.notifications = payload;
    },
    setAllUsers: (state, { payload }:PayloadAction<ChatsSliceType['allUsers']>) => {
      state.allUsers = payload;
    },
  },
});
export const { setActiveChat, setNotifications,setAllUsers } = chatsSlice.actions;
export default chatsSlice.reducer;
