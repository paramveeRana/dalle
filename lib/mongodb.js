import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local or in your Vercel project settings'
  );
}

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB || 'dalle';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If we have a cached connection, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Connect to cluster
    const client = await MongoClient.connect(MONGODB_URL, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    });

    const db = client.db(MONGODB_DB);

    // Set cache
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
} 