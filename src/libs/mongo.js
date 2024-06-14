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
