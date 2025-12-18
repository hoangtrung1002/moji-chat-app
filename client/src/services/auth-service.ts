import { fetchData, postData } from "@/lib/axios";

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
      { withCredentials: true } // attach cookie to request sent to server
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
      undefined,
      { withCredentials: true }
    );
    return response;
  },

  fetchMe: async () => {
    const response = await fetchData<IFetchMeResponse>("/users/me", {
      withCredentials: true,
    });
    return response.user;
  },

  refresh: async () => {
    const response = await postData<IRefreshResponse>(
      "/auth/refresh",
      undefined,
      {
        withCredentials: true,
      }
    );

    return response.accessToken;
  },
};
