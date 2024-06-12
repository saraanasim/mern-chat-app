export type HeadersType = {
  Authorization: string;
  'Content-Type': string;
};

export type SignupPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type IUser = {
  _id: string
  name: string;
  email: string;
  password: string;
  profilePic: string;
  bio: string
}

export type IChat = {
  photo?: string;
  chatName: string;
  isGroup?: boolean;
  users: string[];
  groupAdmin: string | null;
}

export type IGroup = Omit<IChat, 'isGroup'> & {
  isGroup: true
}