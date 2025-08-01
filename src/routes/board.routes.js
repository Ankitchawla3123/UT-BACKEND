import { Router } from "express";
import { verifyBoard, verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  accessBoard,
  accessSharedBoard,
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
  .route("/:boardId")
  .delete(verifyJWT, verifyBoard, deleteBoard)
  .get(verifyJWT, verifyBoard, accessBoard);

boardRouter.route("/:boardId/share").post(verifyJWT, verifyBoard, shareBoard);
boardRouter.route("/sharedboard/:shareId").get(verifyJWT, accessSharedBoard);


export default boardRouter;
