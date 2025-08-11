import mongoose, { Schema } from "mongoose";

const lineupsSchema = new Schema({
  homeformation: {
    type: String,
    required: true,
  },
  awayformation: {
    type: String,
    required: true,
  },
});
