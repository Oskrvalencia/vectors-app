import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PointSchema = new mongoose.Schema({
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
    unique: true,
  },
});

export default mongoose.models.Point || mongoose.model("Point", PointSchema);
