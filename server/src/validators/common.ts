import z from "zod";
export const getMessagesQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 50))
    .refine((v) => !isNaN(v) && v > 0, "Invalid limit"),

  cursor: z.string().optional(),
});
