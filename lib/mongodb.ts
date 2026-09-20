import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/digital_spyke';
const options = {
  serverSelectionTimeoutMS: 3000,
  connectTimeoutMS: 3000,
};

let clientPromise: Promise<MongoClient> | null = null;
let isLoggedConnected = false;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().then((c) => {
        if (!isLoggedConnected) {
          console.log('\x1b[32m[MongoDB] ✅ Database connected successfully: digital_spyke\x1b[0m');
          isLoggedConnected = true;
        }
        return c;
      });
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect().then((c) => {
      if (!isLoggedConnected) {
        console.log('\x1b[32m[MongoDB] ✅ Database connected successfully: digital_spyke\x1b[0m');
        isLoggedConnected = true;
      }
      return c;
    });
  }
  return clientPromise;
}

export default getMongoClientPromise();

export async function getDatabase(): Promise<Db> {
  try {
    const promise = getMongoClientPromise();
    const connectedClient = await promise;
    const dbName = uri.split('/').pop()?.split('?')[0] || 'digital_spyke';
    return connectedClient.db(dbName);
  } catch (error: any) {
    console.error('\x1b[31m[MongoDB] ❌ Database connection error:\x1b[0m', error.message);
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = undefined;
    }
    clientPromise = null;
    throw error;
  }
}
