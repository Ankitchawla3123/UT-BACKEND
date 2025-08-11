import mongoose, { Schema } from "mongoose";

const fixturesSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  hometeamid: {
    type: String,
    required: true,
  },
  awayteamid: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  leagueid: {
    type: String,
    required: true,
  },
  homescore: {
    type: String,
  },
  awayscore: {
    type: String,
  },
  winner: {
    type: String,
  },
});

export const Fixture = mongoose.model("Fixture", fixturesSchema);
