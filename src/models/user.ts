import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
});

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose#:~:text=The%20error%20is%20occurring%20because,it%20when%20it%20needs%20it.

// export const User = mongoose.models.User || mongoose.model("User", userSchema);

const UserModel = mongoose.models.User || model("User", userSchema);

export default UserModel;
