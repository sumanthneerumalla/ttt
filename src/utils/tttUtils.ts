export function isMoveAllowed() {
  //for now just return true, later check against the db to retrieve the game the
  //user is playing, and check if the move is allowed on that game
  //may need to use a separate function to check the move on the game
  return true;
}

export function submitMove() {
  //need to take the move, and apply it to the game id in the database
  //will return the latest state of the game
}
