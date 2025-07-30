import { Router } from "express";
import { sendOtp } from "../controllers/opt.controllers.js";

const userRouter = Router();

userRouter.route("/otp").post(sendOtp);
