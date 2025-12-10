import { postData } from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await postData<IDefaultResponse>(
      "/auth/signup",
      { username, password, email, firstName, lastName },
      { withCredentials: true }
    );

    return response;
  },

  signIn: async (identifier: string, password: string) => {
    const response = await postData<ISignInResponse>(
      "/auth/signin",
      { identifier, password },
      { withCredentials: true }
    );

    return response;
  },
  signOut: async () => {
    const response = await postData<IDefaultResponse>(
      "/auth/signout",
      {},
      { withCredentials: true }
    );
    return response;
  },
};
