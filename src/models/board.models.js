import mongoose, { Schema } from "mongoose";

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

export const Board = mongoose.model("Board", boardSchema);
