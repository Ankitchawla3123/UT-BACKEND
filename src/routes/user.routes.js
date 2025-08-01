import { Router } from "express";
import { sendOtp } from "../controllers/opt.controllers.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.route("/send-otp").post(sendOtp);
//todo
// can add params also /:purpose
// purpose will tell why is this needed registeration , password reset etc
// it will give accessibility to not to search for email if we using for reset

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);

userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;
