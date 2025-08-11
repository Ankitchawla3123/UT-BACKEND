import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  number: { type: Number },
  pos: { type: String },
  grid: { type: String, default: null },
});


const teamLineupSchema = new Schema({
  teamId: { type: Number, required: true },
  name: { type: String, required: true },
  formation: { type: String, required: true },
  coach: {
    type: String,
  },
  startXI: [playerSchema],
  substitutes: [playerSchema],
});

const lineupsSchema = new Schema(
  {
    fixtureId: { type: Number, required: true },
    homeTeam: teamLineupSchema,
    awayTeam: teamLineupSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Lineup", lineupsSchema);
