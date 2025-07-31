import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";

const lineSchema = new Schema(
  {
    metadata: {
      type: {
        type: String,
      },
      name: { type: String },
    },
    color: { type: String },
    line: {
      x1: { type: Number },
      y1: { type: Number },
      x2: { type: Number },
      y2: { type: Number },
    },
    leftend: { type: String },
    rightend: { type: String },
    linetype: { type: String },
    aspect: { type: String },
  },
  { _id: false }
);

const playerSchema = new Schema(
  {
    number: { type: Number },
    color: { type: String },
    name: { type: String },
    metadata: {
      type: {
        type: String,
      },
      name: { type: String },
    },
    x: { type: Number },
    y: { type: Number },
    aspect: { type: String },
  },
  { _id: false }
);

const polygonSchema = new Schema(
  {
    metadata: {
      type: {
        type: String,
      },
      name: { type: String },
    },
    color: { type: String },
    polygon: [[{ type: Number }]], // array of [x, y] points
    aspect: { type: String },
  },
  { _id: false }
);

const boardSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lines: {
      type: [lineSchema],
      default: [],
    },

    players: {
      type: [playerSchema],
      default: [],
    },

    polygons: {
      type: [polygonSchema],
      default: [],
    },
  },
  { timestamps: true }
);

boardSchema.post("save", async (doc, next) => {
  const user = await User.findById(doc.owner);
  if (user) {
    user.boards.push(doc._id);
    await user.save();
  }
  next();
});

boardSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc?.owner) {
    await User.findByIdAndUpdate(doc.owner, {
      $pull: { boards: doc._id },
    });
  }
  next();
});

export const Board = mongoose.model("Board", boardSchema);
