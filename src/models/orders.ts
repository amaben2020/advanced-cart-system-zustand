import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  total: {
    type: Number,
  },
  reference: {
    type: String,
  },
  email: {
    type: String,
  },
  payment_status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
});

const Order = mongoose.models.Order || model("Order", orderSchema);

export default Order;
