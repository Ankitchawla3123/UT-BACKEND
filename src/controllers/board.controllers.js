import { Board } from "../models/board.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Shareboard } from "../models/share.models.js";

const SaveBoard = asyncHandler(async (req, res) => {
  const { lines = [], polygons = [], players = [] } = req.body;
  const userid = req.user?._id;

  if (!userid) {
    throw new ApiError(401, "Unauthorized Request/ Unable to fetch user");
  }

  if (
    !Array.isArray(lines) ||
    !Array.isArray(polygons) ||
    !Array.isArray(players)
  ) {
    throw new ApiError(400, "Invalid data format. Expected arrays.");
  }

  if (lines.length === 0 && polygons.length === 0 && players.length === 0) {
    throw new ApiError(400, "Received empty board");
  }

  const board = await Board.create({
    lines,
    polygons,
    players,
    owner: userid,
  });
  if (!board) {
    throw new ApiError(500, "Failed to save board");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, { boardId: board._id }, "Board saved sucessfully")
    );
});

const updateBoard = asyncHandler(async (req, res) => {
  const { lines, polygons, players } = req.body;
  const boardId = req.board?._id;

  if (!boardId) {
    throw new ApiError(404, "Board Not found");
  }
  const updateData = {};
  if (lines) updateData.lines = lines;
  if (polygons) updateData.polygons = polygons;
  if (players) updateData.players = players;

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    { $set: updateData },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { boardId: updatedBoard._id },
        "Board updated successfully"
      )
    );
});

const deleteBoard = asyncHandler(async (req, res) => {
  const boardId = req.board?._id;
  if (!boardId) {
    throw new ApiError(404, "Board not found");
  }
  // delete method
  // Board.deleteOne({ _id: ObjectId("...") });
  //deleteMany({ type: "old" });

  const deletedBoard = await Board.findByIdAndDelete(boardId);
  if (!deletedBoard) {
    throw new ApiError(404, "Board not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Deleted successfully"));
});

const shareBoard = asyncHandler(async (req, res) => {
  const board = req.board;
  const expiry = req.body.expiry;

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  const expiryTime = new Date(Date.now() + parseInt(expiry) * 60 * 60 * 1000);

  const shared = await Shareboard.create({
    owner: board.owner,
    lines: board.lines,
    players: board.players,
    polygons: board.polygons,
    expiresAt: expiryTime,
  });

  if (!shared) {
    throw new ApiError(500, "Unable to share board");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { shareId: shared._id }, "Board shared successfully")
    );
});

export { SaveBoard, updateBoard, deleteBoard, shareBoard };
