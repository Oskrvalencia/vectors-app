import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, añade un nombre"],
  },
  username: {
    type: String,
    required: [true, "Por favor, añade un nombre"],
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
  /* password: {
    type: String,
    required: [true, "Por favor, añade una contraseña"],
    minlength: 6,
    select: false, 
  }, */
});

module.exports = mongoose.model("Users", UsersSchema);
