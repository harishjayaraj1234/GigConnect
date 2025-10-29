import mongoose from "mongoose";

<<<<<<< HEAD
const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    image: String,

    // The freelancer who posted this gig
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const gigModel = mongoose.model("Gig", gigSchema);
export default gigModel;
=======
const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  image: String,

  // The freelancer who posted this gig
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const gigModel = mongoose.model("Gig", gigSchema);
export default gigModel
>>>>>>> 8685df037814285e8694df32842517a96114253e
