import { RootState } from "../store";

export const selectActiveUser = (state: RootState) => state.activeUser;
