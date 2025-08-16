import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    urlsChecked: [{ type: mongoose.Schema.Types.ObjectId, ref: "URL" }],
  },

  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
