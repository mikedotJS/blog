import { type Collection, MongoClient, ServerApiVersion } from "mongodb";
import type { IPost } from "../models";
import { env } from ".";

const dbPassword = env.DB_PASSWORD || "";
const uri = `mongodb+srv://mchlrmn:${dbPassword}@cluster0.pf2zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!",
		);
	} finally {
		await client.close();
	}
}

export const db = {
	use: async <T>(dbName: string, collectionName: string) => {
		return async (
			callback: (dbClient: Collection<IPost>) => Promise<T>,
		): Promise<T> => {
			try {
				await client.connect();
				const database = client.db(dbName);
				const collection = database.collection<IPost>(collectionName);

				return await callback(collection);
			} finally {
				await client.close();
			}
		};
	},
};

run().catch(console.dir);
