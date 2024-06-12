import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";
import { IGroup } from "@/utils/types";

const API_REQUESTS = {
  FETCH_ALL_GROUPS: {
    path: '/api/chat/groups',
    method: HTTP_METHODS.GET,
  },
};
const ChatApi = {
  fetchAllGroups: async (): Promise<IGroup[]> => {
    return await sendRequest(API_REQUESTS.FETCH_ALL_GROUPS.method, API_REQUESTS.FETCH_ALL_GROUPS.path);
  },
};

export { ChatApi };

