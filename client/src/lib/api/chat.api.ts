import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";

const API_REQUESTS = {
  ACCESS_CREATE: {
    path: '/api/chat',
    method: HTTP_METHODS.POST,
  },
  FETCH_ALL_CHATS: {
    path: '/api/chat',
    method: HTTP_METHODS.GET,
  },
  CREATE_GROUP: {
    path: '/api/chat/group',
    method: HTTP_METHODS.POST,
  },
  ADD_TO_GROUP: {
    path: '/api/chat/groupAdd',
    method: HTTP_METHODS.PATCH,
  },
};
const ChatApi = {
  acessCreate: async(body: any): Promise<any> => {
    return await sendRequest(API_REQUESTS.ACCESS_CREATE.method, API_REQUESTS.ACCESS_CREATE.path, body);
  },
  fetchAllChats: async(): Promise<any> => {
    return await sendRequest(API_REQUESTS.FETCH_ALL_CHATS.method, API_REQUESTS.FETCH_ALL_CHATS.path);
  },
  createGroup: async(body: any): Promise<any> => {
    return await sendRequest(API_REQUESTS.CREATE_GROUP.method, API_REQUESTS.CREATE_GROUP.path, body);
  },
  addToGroup: async(body: any): Promise<any> => {
    return await sendRequest(API_REQUESTS.ADD_TO_GROUP.method, API_REQUESTS.ADD_TO_GROUP.path,body);
  },
};

export { ChatApi };

