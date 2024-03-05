import { GameMove, GameState, Board } from 'server/routers/post';
import { prisma } from 'server/prisma';

async function getGameById(gameId: number) {
  const dbGame = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (dbGame) {
    // @ts-expect-error gameState will always be in the prisma query response if a response is non-null
    const gameString = dbGame.gameData.gameState!;
    const game: GameState = JSON.parse(gameString);
    return game;
  }
  return null;
}
function isRoundComplete(board: number[][]): boolean {
  //using this win detection tecnique: https://stackoverflow.com/a/18668901
  //[row1, row2, row3, col1, col2, col3, diag1, diag2];

  const score: number[] = new Array(8).fill(0);

  const boardLen = board.length;
  board.map((row, rowIndex) => {
    row.map((cellVal, colIndex) => {
      score[rowIndex] += cellVal;
      score[boardLen + colIndex] += cellVal;
      if (rowIndex === colIndex) {
        score[boardLen * 2] += cellVal;
      }

      if (boardLen - colIndex - 1 === rowIndex) {
        score[boardLen * 2 + 1] += cellVal;
      }
    });
  });

  for (const scoreItem of score) {
    if (scoreItem === 3 || scoreItem === -3) {
      return true;
    }
  }

  return false;
}

export async function processMove(
  move: GameMove,
  userId: string,
): Promise<GameState | null> {
  const { gameId, xMove, yMove } = move;

  const game: GameState | null = await getGameById(gameId);

  if (!game) {
    return null; //game id not found
  } else if (
    game.board[xMove][yMove] !== 0 ||
    xMove >= game.board.length ||
    xMove < 0 ||
    yMove >= game.board.length ||
    yMove < 0
  ) {
    return null; //invalid cell selection
  } else if (game.nextPlayer !== userId) {
    return null; //it's not this player's turn yet
  } else if (game.roundCompleted){
    return null; //game is over
  } else {
    const gameState = await updateGameState(move, game);
    return gameState;
  }
}

export async function updateGameState(move: GameMove, gameState: GameState) {
  //need to take the move, and apply it to the game id in the database
  //will return the latest state of the game

  // eslint-disable-next-line prefer-const
  let { board, turn, nextPlayer, players, roundCompleted } = gameState;

  if (turn % 2 == 0) {
    board[move.xMove][move.yMove] = -1;
  } else {
    board[move.xMove][move.yMove] = 1;
  }

  roundCompleted = isRoundComplete(board);
  console.log('win detected', roundCompleted);

  turn += 1;
  nextPlayer = players[turn % players.length];
  gameState = { board, turn, players, nextPlayer, roundCompleted };

  const gameString = JSON.stringify(gameState);
  await prisma.game.update({
    where: {
      id: move.gameId,
    },
    data: {
      gameData: {
        gameState: gameString,
      },
    },
  });
  return gameState;
}
