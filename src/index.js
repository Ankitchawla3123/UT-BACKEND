import { app } from "./app.js";
import connectDB from "./db/index.js";

const dotenv = require("dotenv");
dotenv.config({
  path: "./env",
});

connectDB().then;
