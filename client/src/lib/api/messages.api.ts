import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";

const API_REQUESTS = {
  SEND_MESSAGE: {
    path: '/api/message',
    method: HTTP_METHODS.POST,
  },
  FETCH_MESSAGES: {
    path: '/api/message',
    method: HTTP_METHODS.GET,
  },
};

const MessageApi = {
  sendMessage: (body: any): Promise<any> => {
    return sendRequest(API_REQUESTS.SEND_MESSAGE.method, API_REQUESTS.SEND_MESSAGE.path, body);
  },
  fetchMessages: (id: string): Promise<any> => {
    return sendRequest(API_REQUESTS.FETCH_MESSAGES.method, `${API_REQUESTS.FETCH_MESSAGES.path}/${id}`);
  },
};

export { MessageApi };
