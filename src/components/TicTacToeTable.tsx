import { trpc } from '../utils/trpc';
import { GameState, GameMove } from '../server/routers/post';
import { useState } from 'react';

const defaultGame: GameState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  turn: 0,
  players: ['test', 'test'],
  nextPlayer: 'test',
  winningPlayer: null,
};

const defaultMove: GameMove = {
  gameId: 1,
  xMove: 1,
  yMove: 1,
};

export default function TicTacToeTable() {
  const logMove = (rowIndex: number, cellIndex: number) => {
    console.log(rowIndex, cellIndex);
  };

  const [remoteGameState, setRemoteGameState] =
    useState<GameState>(defaultGame);

  const makeMove = trpc.post.createMove.useMutation();

  //event handler for sending button presses to backend
  function cellPress(rowIndex: number, cellIndex: number) {
    console.log('move on : ', rowIndex, ',', cellIndex);
    makeMove.mutate(
      {
        ...defaultMove,
        xMove: rowIndex,
        yMove: cellIndex,
      },
      {
        onSuccess: (result) => {
          if (result) {
            setRemoteGameState(result);
          }
        },
      },
    );
  }

  return (
    <div className="flex-1 md:h-screen">
      <section className="flex h-full flex-col bg-purple-700 p-4">
        <div className="flex flex-col space-y-4 justify-center items-center h-screen">
          <div className="turn-info text-gray-300 flex space-x-4">
            <div className="border-2 border-grey rounded-lg p-4  ">
              X - {remoteGameState.players[0]}
            </div>
            <div className="border-2 border-grey rounded-lg p-4  ">
              O - {remoteGameState.players[1]}
            </div>
          </div>
          <table className="tic-tac-toe-table ">
            <tbody>
              {remoteGameState.board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cellVal, cellIndex) => (
                    <td key={cellIndex} className="tic-tac-toe-cell">
                      <button
                        className="w-12 h-12 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg"
                        onClick={() => cellPress(rowIndex, cellIndex)}
                      >
                        {cellVal === 1 ? 'O' : cellVal === -1 ? 'X' : null}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <NgButton />
        </div>
      </section>
      {
        //create a button to make a move}
      }
    </div>
  );
}

function NgButton() {
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
      Create a new test game
    </button>
  );
}
