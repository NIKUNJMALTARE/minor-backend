const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  additionalDetails: { type: String },
  quantity: { type: Number, default: 1 },
  image: { type: String, required: true }, // Store paths to uploaded images
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
});

module.exports = mongoose.model("Item", ItemSchema);
