import { postData } from "@/lib/axios";
import type { IUploadAvatarResponse } from "@/types";

export const userService = {
  uploadAvatar: async (formData: FormData) => {
    const res = await postData<IUploadAvatarResponse>(
      "/users/uploadAvatar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    if (res.status === 400) {
      throw new Error(res.message);
    }

    return res.avatarUrl;
  },
};
