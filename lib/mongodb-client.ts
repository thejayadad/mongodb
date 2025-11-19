// lib/mongodb-client.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // optional, can be undefined

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment");
}

let client: MongoClient;
let db: Db;

declare global {
  // So we don't create multiple clients in dev (hot reload)
  // eslint-disable-next-line no-var
  var _mongo: { client: MongoClient; db: Db } | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    const _client = new MongoClient(uri);
    const _db = _client.db(dbName); // if dbName is undefined, Mongo uses the one in the URI
    global._mongo = { client: _client, db: _db };
  }
  client = global._mongo.client;
  db = global._mongo.db;
} else {
  client = new MongoClient(uri);
  db = client.db(dbName);
}

export { client, db };
