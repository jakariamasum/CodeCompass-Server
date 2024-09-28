import { z } from "zod";

const createUserValidationSchema= z.object({
    body: z.object({
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    password: z.string(),
    })
})
export const UservalidationSchemas={
    createUserValidationSchema
}