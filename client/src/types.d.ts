interface IThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}
interface IChatState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: IMessage[];
      hasMore: boolean; // infinite-scroll
      nextCursor?: string | null;
    }
  >;
  activeConversationId: string | null;
  convoLoading: boolean;
  messageLoading: boolean;
  reset: () => void;
  setActiveConversation: (id: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId?: string) => Promise<void>;
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
interface IFriend {
  _id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

interface IFriendRequest {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

interface IGroup {
  name: string;
  createdBy: string;
}

interface IParticipant {
  _id: string;
  displayName: string;
  avatarUrl?: string | null;
  joinedAt: string;
}

interface ISeenUser {
  _id: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  imgUrl?: string | null;
  updatedAt?: string | null;
  createdAt: string;
  isOwn?: boolean;
}

interface ILastMessage {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

interface IConversation {
  _id: string;
  type: "direct" | "group";
  group: IGroup;
  participants: IParticipant[];
  lastMessageAt: string;
  seenBy: ISeenUser[];
  lastMessage: ILastMessage | null;
  unreadCounts: Record<string, number>; // key = userId, value = unread count
  createdAt: string;
  updatedAt: string;
}

interface IConversationResponse {
  conversations: IConversation[];
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

interface IFetchMessagesResponse {
  messages: IMessage[];
  cursor?: string;
}
