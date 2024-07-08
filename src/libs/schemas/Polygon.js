import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PointSchema = new mongoose.Schema({
  coordinates: {
    type: [],
    required: [true, "Por favor, añade una coordenada"],
    unique: true,
  },
  name: {
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

export default mongoose.models.Polygon || mongoose.model("Polygon", PointSchema);
