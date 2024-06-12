import { RootState } from "../store";

export const selectAllGroups = (state: RootState) => state.groups.allGroups;