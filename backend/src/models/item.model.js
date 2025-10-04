import mongoose, { Schema, Types, model } from "mongoose";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shopSchema",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwitches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others",
      ],
      required: true,
    },

    price: {
      types: Number,
      min: 0,
      required: true,
    },

    foodType: {
      type: String,
      enum: ["veg", "non veg"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = new model("Item", itemSchema);
