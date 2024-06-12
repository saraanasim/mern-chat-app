import { HTTP_METHODS } from "@/utils/constants";
import { sendRequest } from "@/utils/request-service";
import { IUser, LoginPayload, SignupPayload } from "@/utils/types";

const API_REQUESTS = {
  SIGN_IN: {
    path: '/auth/login',
    method: HTTP_METHODS.POST,
  },
  SIGN_UP: {
    path: '/auth/register',
    method: HTTP_METHODS.POST,
  },
  VALIDATE_USER: {
    path: '/auth/valid',
    method: HTTP_METHODS.GET,
  },
  SEARCH_USERS: {
    path: '/api/user',
    method: HTTP_METHODS.GET,
  },
  GET_ALL_USERS: {
    path: '/api/users/all',
    method: HTTP_METHODS.GET,
  },
  UPDATE_USER: {
    path: '/api/users/update',
    method: HTTP_METHODS.PATCH,
  },
};


const AuthApi = {
  loginUser: async (body: LoginPayload): Promise<any> => {
    return await sendRequest(API_REQUESTS.SIGN_IN.method, API_REQUESTS.SIGN_IN.path, body);
  },
  registerUser: async (body: SignupPayload): Promise<any> => {
    return await sendRequest(API_REQUESTS.SIGN_UP.method, API_REQUESTS.SIGN_UP.path, body);
  },
  validUser: async (): Promise<any> => {
    return await sendRequest(API_REQUESTS.VALIDATE_USER.method, API_REQUESTS.VALIDATE_USER.path);
  },
  getAllUsers: async (): Promise<IUser[]> => {
    return await sendRequest(API_REQUESTS.GET_ALL_USERS.method, `${API_REQUESTS.GET_ALL_USERS.path}`);
  },
  updateUser: async (id: string, body: any): Promise<any> => {
    return await sendRequest(API_REQUESTS.UPDATE_USER.method, `${API_REQUESTS.UPDATE_USER.path}/${id}`, body);
  },
};

export { AuthApi };
