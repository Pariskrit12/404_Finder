import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    mainUrl: {
      type: String,
      required: true,
    },

    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "failed"],
      default: "pending",
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
  },
  { timestamps: true }
);
export const URL = mongoose.model("URL", urlSchema);
