const { z } = require("zod");
const RegisterSchema = z.object({
  name: z.string().min(2, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be six characters long." }),
});

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be six characters long." }),
});
const validateZodSchema = async (Schema, data) => {
  const validateResult = Schema.safeParse(data);
  if (!validateResult.success) {
    // Extract error messages from the validation error
    const errors = validateResult.error.errors.map((error) => error.message);
    console.log(errors);
    // Throw a single error message string
    throw new Error(errors.join(", "));
  }
  return validateResult.data;
};

module.exports = {
  LoginSchema,
  RegisterSchema,
  validateZodSchema,
};
