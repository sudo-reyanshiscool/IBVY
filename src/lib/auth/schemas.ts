import { z } from "zod";

/** Self-registration is teacher or school only; admins are seeded. */
export const signUpSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  // The UI always supplies a value (defaults to teacher), so the default
  // enum error suffices; this avoids the v3/v4 params-shape difference.
  role: z.enum(["teacher", "school"]),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
