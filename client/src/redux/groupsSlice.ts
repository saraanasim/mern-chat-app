import { IGroup } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GroupsSliceType = {
  allGroups: Array<IGroup>
  activeGroup: string | null,
  isLoading: boolean,
}

const initialState: GroupsSliceType = {
  allGroups: [],
  activeGroup: null,
  isLoading: false
};
const groupsSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAllGroups: (state, { payload }: PayloadAction<GroupsSliceType['allGroups']>) => {
      state.allGroups = payload;
    },

  },
});
export const { setAllGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
