import { trpc } from '../utils/trpc';
import { GameState, GameMove } from '../server/routers/post';
import { useState } from 'react';

export default function TicTacToeTable() {
  const game: GameState = {
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    turn: 1,
    players: ['a', 'b'],
  };

  const logMove = (rowIndex: number, cellIndex: number) => {
    console.log(rowIndex, cellIndex);
  };

  const [remoteGameState, setRemoteGameState] = useState<GameState>(game);

  const makeMove = trpc.post.createMove.useMutation();

  return (
    <div className="flex-1 md:h-screen">
      <section className="flex h-full flex-col justify-end space-y-4 bg-purple-700 p-4">
        <table className="tic-tac-toe-table flex justify-center items-center h-screen">
          <tbody>
            {remoteGameState.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cellVal, cellIndex) => (
                  <td key={cellIndex} className="tic-tac-toe-cell">
                    <button
                      className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg"
                      onClick={() => logMove(rowIndex, cellIndex)}
                    >
                      {cellVal}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() =>
              makeMove.mutate({
                xMove: 1,
                yMove: 1,
                gameId: 1,
              })
            }
          >
            click to send move{' '}
          </button>
        </div>
      </section>
      {
        //create a button to make a move}
      }
    </div>
  );
}
