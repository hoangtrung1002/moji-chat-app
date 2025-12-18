interface IUser {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IAuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  user: IUser | null;
  loading: boolean;
  clearState: () => void;
  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  signIn: (identifier: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface IDefaultResponse {
  message: string;
}

interface ISignInResponse extends IDefaultResponse {
  accessToken: string;
}

interface IFetchMeResponse {
  user: IUser;
}

interface IRefreshResponse {
  accessToken: string;
}
