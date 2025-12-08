import z from "zod";

export const emailSchema = z.email("Invalid email address").trim();

export const passwordSchema = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters");

export const signUpSchema = z.object({
  username: z.string().trim().min(1),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: emailSchema,
  password: passwordSchema,
  avatar: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
});

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, "username or email is required"),
  password: passwordSchema,
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
