import * as z from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  MONGODB_URI: z.string().url(),
  PAYLOAD_SECRET: z.string().min(10),
});

const rawEnv = {
  MONGODB_URI: process.env.MONGODB_URI,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
};

const parsed = EnvSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:\n", parsed.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
