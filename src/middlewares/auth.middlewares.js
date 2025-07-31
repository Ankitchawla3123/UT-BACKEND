import { User } from "../models/user.models.js";
import { Board } from "../models/board.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT and attach user to request
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const verifyBoard = asyncHandler(async (req, _, next) => {
  const { boardId } = req.params;
  const userId = req.user?._id;

  if (!boardId) {
    throw new ApiError(400, "Board ID is required");
  }

  const board = await Board.findById(boardId);
  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  if (!board.owner.equals(userId)) {
    throw new ApiError(403, "Forbidden: You do not own this board");
  }

  req.board = board;

  next();
});

export { verifyJWT, verifyBoard };
