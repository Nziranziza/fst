import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { generatePlayer, replaceAt } from "./utilities";

import "./App.scss";

const { REACT_APP_BACKEND_URL = '' } = process.env;
function play(board) {
  return fetch(`${REACT_APP_BACKEND_URL}/api/v1/play?board=${board}`).then((res) =>
    res.json()
  );
}

const firstPlayer = generatePlayer();

function App() {
  const [board, setBoard] = useState("+++++++++");
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPlayer, setNextPlayer] = useState(firstPlayer);

  const getNewBoard = async (board) => {
    try {
      setLoading(true);
      const { board: newBoard, winner, tie } = await play(board);
      setBoard(newBoard);
      setWinner(winner);
      setTie(tie);
      setNextPlayer("x");
    } catch (error) {
      toast.error("Failed to load new board, please refresh to try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nextPlayer === "o") {
      getNewBoard(board);
    }
  }, []);

  useEffect(() => {
    if (winner === "x") {
      toast.success("Congratulations!, you won, refresh to play new game");
    } else if (winner === "o") {
      toast.error("Ops!, computer won, refresh to play new game");
    }
  }, [winner]);

  useEffect(() => {
    if (tie) {
      toast.info("It is a tie, please refresh to play a new game");
    }
  }, [tie]);

  const boardArray = [
    board.slice(0, 3).split(""),
    board.slice(3, 6).split(""),
    board.slice(6, 9).split(""),
  ];

  const playNext = (rowIndex, colIndex) => {
    const newBoard = replaceAt(board, rowIndex * 3 + colIndex, "x");
    setBoard(newBoard);
    setNextPlayer("o");
    getNewBoard(newBoard);
  };

  return (
    <div className="App">
      <header>
      {!winner && !tie && <h1>
        <span className="label">Next Player:</span>
        <span className="value">{nextPlayer}</span>
      </h1>}
      </header>
      {boardArray.map((row, rowIndex) => (
        <fieldset disabled={loading || winner || tie}>
          <div className="row">
            {row.map((col, colIndex) => (
              <button
                onClick={() => playNext(rowIndex, colIndex)}
                className="col"
                disabled={col === "x" || col === "o"}
              >
                {col === "+" ? "" : col}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default App;
