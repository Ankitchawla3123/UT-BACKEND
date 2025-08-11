import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
  teamid: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
});
