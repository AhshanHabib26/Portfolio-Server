import { z } from "zod";

export const userValidation = z.object({
  name: z.string({ required_error: "Name is Required" }),
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid email format" }),
  password: z.string({ required_error: "Password is Required" }),
});
