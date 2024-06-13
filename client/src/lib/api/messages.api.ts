import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";
import { IMessage } from "@/utils/types";

const API_REQUESTS = {
  SEND_MESSAGE: {
    path: '/api/message',
    method: HTTP_METHODS.POST,
  },
  FETCH_MESSAGES: {
    path: '/api/message/get-messages',
    method: HTTP_METHODS.POST,
  },
};

const MessageApi = {
  sendMessage: (body: { chatId: string, message: string }): Promise<IMessage> => {
    return sendRequest(API_REQUESTS.SEND_MESSAGE.method, API_REQUESTS.SEND_MESSAGE.path, body);
  },
  fetchMessages: (body: { chatId: string }): Promise<IMessage[]> => {
    return sendRequest(API_REQUESTS.FETCH_MESSAGES.method, `${API_REQUESTS.FETCH_MESSAGES.path}`,body);
  },
};

export { MessageApi };
