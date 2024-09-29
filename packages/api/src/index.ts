import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db } from "./config/db";
import type { IPost } from "./models";
import { env } from "./config";
import type { InsertOneResult } from "mongodb";
import { bearerAuth } from "hono/bearer-auth";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.get("/posts", async (c) => {
	try {
		const orm = await db.use<IPost[]>(env.DB_NAME, "posts");

		const posts = await orm(
			async (collection) => await collection.find({}).toArray(),
		);

		return c.json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return c.json({ error: "Failed to fetch posts" }, 500);
	}
});

app.post("/posts", bearerAuth({ token: env.TOKEN }), async (c) => {
	try {
		const newPost = await c.req.json();
		const orm = await db.use<InsertOneResult<IPost>>(env.DB_NAME, "posts");

		const result = await orm(
			async (collection) => await collection.insertOne(newPost),
		);

		return c.json(result);
	} catch (error) {
		console.error("Error creating post:", error);
		return c.json({ error: "Failed to create post" }, 500);
	}
});

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
