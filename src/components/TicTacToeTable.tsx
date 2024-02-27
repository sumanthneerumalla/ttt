import { trpc } from '../utils/trpc';
import { GameState, GameMove } from '../server/routers/post';
import { useState } from 'react';

const defaultGame: GameState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  turn: 1,
  players: ['a', 'b'],
};

export default function TicTacToeTable() {
  const logMove = (rowIndex: number, cellIndex: number) => {
    console.log(rowIndex, cellIndex);
  };

  const [remoteGameState, setRemoteGameState] =
    useState<GameState>(defaultGame);

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
                      onClick={() =>
                        makeMove.mutate({
                          xMove: cellIndex,
                          yMove: rowIndex,
                          gameId: 1,
                        })
                      }
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
          <MyButton />
        </div>
      </section>
      {
        //create a button to make a move}
      }
    </div>
  );
}

function MyButton() {
  const createGame = trpc.post.gameEntry.useMutation();

  const gameAsJson = JSON.stringify(defaultGame);

  const clickFunction = async () => {
    await createGame.mutateAsync({
      gameState: gameAsJson,
      gameId: 1,
    });
  };

  return (
    <button
      className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg"
      onClick={clickFunction}
    >
      Test Button
    </button>
  );
}
