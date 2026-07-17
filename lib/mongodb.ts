import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first')
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/fittrack";
const options = {};

// Force the db name explicitly so it always matches lib/auth.ts's
// client.db("fittrack") — relying on client.db() with no argument
// silently falls back to whatever (or no) database name is embedded
// in MONGODB_URI, which is what caused queries to return 0 results.
const DB_NAME = "fittrack";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to preserve connection across hot-reloads
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(DB_NAME); // explicit — always "fittrack"
}

export default clientPromise;