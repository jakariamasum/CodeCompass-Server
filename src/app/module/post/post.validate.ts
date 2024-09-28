import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
  }),
});
export const PostValidationSchemas = {
  createPostValidationSchema,
};
