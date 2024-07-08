import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CircleSchema = new mongoose.Schema({
  latLng: {
    type: [],
    required: [true, "Por favor, añade una coordenada"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Por favor, añade una descripcion"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "Por favor, añade una usuario"],
    unique: false,
  },
});

export default mongoose.models.Circle || mongoose.model("Circle", CircleSchema);
