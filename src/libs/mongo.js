import mongoose from "mongoose";

const mongo_user = process.env.mongo_user;
const mongo_password = process.env.mongo_password;

async function connectDB() {
  const url = `mongodb+srv://${mongo_user}:${mongo_password}@cluster0.co1yzyh.mongodb.net/vectorsmap?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(url);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
  }
}

export default connectDB;


/* 
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
*/