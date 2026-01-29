import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import multer from "multer";
import { BadRequestException } from "../utils/app-error";

export const upload = multer({
  storage: multer.memoryStorage(), //store file as raw in memory
  limits: {
    fileSize: 1024 * 1024 * 1, // 1MB
  },
});

export const uploadImageFromBuffer = (
  buffer: Buffer,
  options?: UploadApiOptions,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "moji_chat/avatars",
        resource_type: "image",
        transformation: [{ width: 200, height: 200, crop: "fill" }],
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          return reject(new BadRequestException("Upload failed: no result"));
        }
        resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
};
