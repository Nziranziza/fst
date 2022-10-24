import { getWinner, playNext } from "../utilities";

export const play = (req, res, next) => {
  try {
    let { board } = req.query;
    if (!board) {
      return res.status(400).json({
        message: "board is required",
      });
    }
    if (board.length !== 9) {
      return res.status(400).json({
        message: "board should be a string of length 9",
      });
    }
    if (
      board
        .split("")
        .find(
          (c) =>
            c.toLowerCase() !== "x" &&
            c.toLowerCase() !== "o" &&
            c.toLowerCase() !== " "
        )
    ) {
      return res.status(400).json({
        message: "board should only contain x, o, or <space>",
      });
    }
    let { winner, tie } = getWinner(board);
    if (!tie && !winner) {
      board = playNext(board);
      const reCheck = getWinner(board);
      winner = reCheck.winner;
      tie = reCheck.tie;
    }
    return res.status(200).json({
      winner,
      tie,
      board: board.replaceAll(" ", "+")
    });
  } catch (error) {
    return next(error);
  }
};
