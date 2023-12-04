import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  brand: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  discountPercentage: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  rating: {
    required: true,
    type: Number,
  },
  stock: {
    required: true,
    type: Number,
  },
  images: {
    required: true,
    type: [String],
  },
});

const ProductModel = mongoose.models.Product || model("Product", productSchema);

export default ProductModel;
