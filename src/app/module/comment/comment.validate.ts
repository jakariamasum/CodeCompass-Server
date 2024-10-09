import { z } from "zod";

const createCommentValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    post: z.string(),
    content: z.string(),
  }),
});
export const CommentvalidationSchemas = {
  createCommentValidationSchema,
};
