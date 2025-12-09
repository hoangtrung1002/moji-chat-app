import { z } from "zod";

export const emailSchema = z.email("Email không hợp lệ").trim();
export const passwordSchema = z
  .string()
  .trim()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự");

export const signUpSchema = z.object({
  username: z.string().trim().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  firstName: z.string().trim().min(1, "Tên bắt buộc phải có"),
  lastName: z.string().trim().min(1, "Họ bặt buộc phải có"),
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, "Nhập tên đăng nhập hoặc email"),
  password: passwordSchema,
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
