import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price_usd: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

export default mongoose.model("Coin", schema);
