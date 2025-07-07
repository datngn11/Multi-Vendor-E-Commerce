import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z
    .string()
    .min(3)
    .max(63)
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain letters, numbers, and hyphens, and must start and end with a letter or number",
    )
    .refine((val) => !val.includes("--"), {
      message: "Username cannot contain consecutive hyphens",
    })
    .transform((val) => val.toLowerCase()),
});
