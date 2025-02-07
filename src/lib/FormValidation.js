import { z } from "zod";
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "email is requred." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be six characters long." }),
});
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be six characters long." }),
});
export const validateZodSchema = async (Schema, data) => {
  const validateResult = Schema.safeParse(data);
  if (!validateResult.success) {
    const errors = validateResult.error.errors.map((error) => error.message);
    console.log(errors);
    throw new Error(errors.join(", "));
  }
  return validateResult.data;
};