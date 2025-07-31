import { Board } from "../models/board.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const SaveBoard = asyncHandler(async (req, res) => {
  const { lines = [], polygons = [], players = [] } = req.body;
  const userid = req.user?._id;

  if (!userid) {
    new ApiError(401, "Unauthorized Request/ Unable to fetch user");
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

export { SaveBoard };
