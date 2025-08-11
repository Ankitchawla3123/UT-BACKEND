import mongoose, { Schema } from "mongoose";

const leagueSchema = new Schema(
  {
    leagueId: {
      type: String,
      required: true,
    },
    leagueName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const League = mongoose.model("League", leagueSchema);
