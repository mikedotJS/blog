import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
	TOKEN: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error("Invalid environment variables:", env.error.format());
	process.exit(1);
}

export const config = env.data;
