import { GameMove, GameState } from 'server/routers/post';
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

export async function isMoveAllowed(move: GameMove, userId: string) {
  const { gameId, xMove, yMove } = move;

  const game: GameState | null = await getGameById(gameId);

  if (!game) {
    return false; //game id not found
  } else if (game.board[xMove][yMove] !== 0) {
    return false; //cell is already occupied
  } else if (game.nextPlayer !== userId) {
    return false; //it's not this player's turn yet
  }

  return true;
}

export function submitMove() {
  //need to take the move, and apply it to the game id in the database
  //will return the latest state of the game
}
