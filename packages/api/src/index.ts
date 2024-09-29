import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { type DeleteResult, type InsertOneResult, ObjectId } from "mongodb";
import type { Post } from "shared";

import { env } from "./config";
import { db } from "./config/db";

const app = new Hono();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(logger());

app.get("/api/posts/:id", async (c) => {
	try {
		const postId = c.req.param("id");
		const orm = await db.use<Post>(env.DB_NAME, "posts");

		const post = await orm(
			async (collection) =>
				await collection.findOne({ _id: new ObjectId(postId) }),
		);

		if (!post) {
			return c.json({ error: "Post not found" }, 404);
		}

		return c.json(post);
	} catch (error) {
		console.error("Error fetching post:", error);
		return c.json({ error: "Failed to fetch post" }, 500);
	}
});

app.get("/api/posts", async (c) => {
	try {
		const orm = await db.use<Post[]>(env.DB_NAME, "posts");

		const posts = await orm(
			async (collection) => await collection.find({}).toArray(),
		);

		return c.json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return c.json({ error: "Failed to fetch posts" }, 500);
	}
});

app.post("/api/posts", bearerAuth({ token: env.TOKEN }), async (c) => {
	try {
		const body = await c.req.json();
		const orm = await db.use<InsertOneResult<Post>>(env.DB_NAME, "posts");

		const post = {
			...body,
			createdAt: new Date(),
		};

		const result = await orm(
			async (collection) => await collection.insertOne(post),
		);

		return c.json(result);
	} catch (error) {
		console.error("Error creating post:", error);
		return c.json({ error: "Failed to create post" }, 500);
	}
});

app.delete("/api/posts/:id", bearerAuth({ token: env.TOKEN }), async (c) => {
	try {
		const postId = c.req.param("id");
		const orm = await db.use(env.DB_NAME, "posts");

		const result = (await orm(
			async (collection) =>
				await collection.deleteOne({ _id: new ObjectId(postId) }),
		)) as DeleteResult;

		if (result.deletedCount === 0) {
			return c.json({ error: "Post not found" }, 404);
		}

		return c.json({ message: "Post deleted successfully" });
	} catch (error) {
		console.error("Error deleting post:", error);
		return c.json({ error: "Failed to delete post" }, 500);
	}
});

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
