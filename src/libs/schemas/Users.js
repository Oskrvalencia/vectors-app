import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Por favor, añade un nombre"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Por favor, añade un correo electrónico"],
    unique: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Por favor, añade un correo electrónico válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor, añade una contraseña"],
    minlength: 6,
    select: false,
  },
});

export default mongoose.models.User || mongoose.model("User", UsersSchema);
