import { GameState } from '../server/routers/post';
import { useState } from 'react';

export default function TicTacToeTable() {
  const game: GameState = {
    board: [
      [0, 1, 2],
      [0, 0, 0],
      [0, 0, 8],
    ],
    playerTurn: 1,
  };

  const logMove = (rowIndex: number, cellIndex: number) => {
    console.log(rowIndex, cellIndex);
  };

  const [localGameState, setLocalGameState] = useState<GameState>(game);
  const [remoteGameState, setRemoteGameState] = useState<GameState>(game);

  return (
    <div className="flex-1 md:h-screen">
      <section className="flex h-full flex-col justify-end space-y-4 bg-purple-700 p-4">
        <table className="tic-tac-toe-table flex justify-center items-center h-screen">
          <tbody>
            {game.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="tic-tac-toe-cell">
                    <button
                      onClick={() => logMove(rowIndex, cellIndex)}
                      className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg"
                    >
                      {cell}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
