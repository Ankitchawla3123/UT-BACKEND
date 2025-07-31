import mongoose, { Schema } from "mongoose";

const SharedBoardSchema = new Schema({});

export const Shareboard = mongoose.model("Shareboard", SharedBoardSchema);
