import { IUser } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ActiveUserSlice = Omit<IUser, 'password'>

const initialState: ActiveUserSlice = {
  _id: '',
  email: '',
  profilePic: '',
  bio: '',
  name: '',
  isActive: false
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, { payload }: PayloadAction<ActiveUserSlice>) => {
      state._id = payload._id;
      state.email = payload.email;
      state.profilePic = payload.profilePic;
      state.bio = payload.bio;
      state.name = payload.name;
    },
  },
});
export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
