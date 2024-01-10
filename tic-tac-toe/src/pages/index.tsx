import Head from "next/head";
import Link from "next/link";
import { GameState } from "../server/api/routers/post";
import { api } from "~/utils/api";
import { useState } from 'react';

export default function Home() {
  const logMove = (e: any) => {
    console.log(e.target.id);
  }
  
  const generateTable = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const cells = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j
        cells.push(<td
          id={index.toString()} key={index + 1} onClick={logMove}>{index + 1}</td>);
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };
  
  const test = api.post.createMove.useMutation();
  let game: GameState = {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    playerTurn: 1,
  }

  const [localGameState, setLocalGameState] = useState<GameState>(game);
  const [remoteGameState, setRemoteGameState] = useState<GameState>(game);

  const updateAndSendGameState = async () => {
    let newGame = {
      ...localGameState,
      playerTurn: localGameState.playerTurn + 1,
    }

    console.log("client gamestate: ", newGame);
    await test.mutateAsync(newGame);
    setLocalGameState(newGame) ;

  };

  api.post.getLatest.useSubscription(undefined, {
    onData(data) {
      setRemoteGameState(data);
    },
  });


  return (
    <div className="h-full w-full bg-purple-300">
      <div className="container mx-auto" id="board">
        <table>
          <tbody>
          {generateTable()}
          </tbody>
        </table>
        <button onClick={updateAndSendGameState}>submitGameState</button>
        <div>
          <br></br>
          <h1>localGameState: {JSON.stringify(localGameState)}</h1>
          <br></br>
          <br></br>
          <h1>remoteGameState: {JSON.stringify(remoteGameState)}</h1>
          <br></br>
          <br></br>
          
        </div>
        <div className="container mx-auto" id="gameInfo">
          <div className="" id="p1Info"> P1 score</div>
          <div className="" id="tie">tie score</div>
          <div className="" id="p2Info">P2 Score</div>

        </div>

      </div>
    </div>
  );
}
