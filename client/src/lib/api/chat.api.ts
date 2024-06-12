import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";
import { IChat, IGroup } from "@/utils/types";

const API_REQUESTS = {
  FETCH_ALL_GROUPS: {
    path: '/api/chat/groups',
    method: HTTP_METHODS.GET,
  },
  FETCH_EXISTING_CHAT: {
    path: '/api/chat/existing',
    method: HTTP_METHODS.POST,
  },
  CREATE_CHAT: {
    path: '/api/chat',
    method: HTTP_METHODS.POST,
  },
};
const ChatApi = {
  fetchAllGroups: async (): Promise<IGroup[]> => {
    return await sendRequest(API_REQUESTS.FETCH_ALL_GROUPS.method, API_REQUESTS.FETCH_ALL_GROUPS.path);
  },
  fetchExistingChat: async (recipient:string): Promise<IChat | null> => {
    return await sendRequest(API_REQUESTS.FETCH_EXISTING_CHAT.method, API_REQUESTS.FETCH_EXISTING_CHAT.path,{recipient});
  },
  createNewChat: async (recipient:string): Promise<IChat | null> => {
    return await sendRequest(API_REQUESTS.CREATE_CHAT.method, API_REQUESTS.CREATE_CHAT.path,{recipient});
  },
  
};

export { ChatApi };

