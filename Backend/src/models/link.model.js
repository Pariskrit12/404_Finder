import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },

    statusCode: {
      type: Number,
    },

    isBroken: {
      type: Boolean,
      default: false,
    },

    mainUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "URL",
    },
  },
  { timestamps: true }
);
export const Link = mongoose.model("Link", linkSchema);
// Create a Mongoose model called "Link" using the linkSchema.
// This model represents the "links" collection in MongoDB and allows
// us to create, read, update, and delete link documents in the database.
