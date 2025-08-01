import { Router } from "express";
import { verifyBoard, verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  deleteBoard,
  SaveBoard,
  shareBoard,
  updateBoard,
} from "../controllers/board.controllers.js";

const boardRouter = Router();

boardRouter.route("/save-board").post(verifyJWT, SaveBoard);
boardRouter
  .route("/:boardId/update")
  .patch(verifyJWT, verifyBoard, updateBoard);

boardRouter
  .route("/:boardId/delete")
  .delete(verifyJWT, verifyBoard, deleteBoard);

boardRouter.route("/:boardId/share").post(verifyJWT, verifyBoard, shareBoard);

export default boardRouter;
