import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { SaveBoard } from "../controllers/board.controllers.js";

const boardRouter = Router();

boardRouter.route("/save-board").post(verifyJWT, SaveBoard);

export default boardRouter;
