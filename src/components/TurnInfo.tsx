export default function TurnInfo(props: {
  turn: number;
  players: string[];
  winningPlayer: string | null;
}) {
  const colorToggleClasses = [
    'text-gray-200 border-gray-200',
    'text-purple-500 border-purple-500',
  ];
  const playerOneActiveTheme = colorToggleClasses[props.turn % 2];
  const playerTwoActiveTheme = colorToggleClasses[(props.turn + 1) % 2];

  // Use the gameState prop to render the component
  if (props.winningPlayer === null) {
    return (
      <div className="turn-info flex space-x-4">
        <div className={'border-2 rounded-lg p-4 ' + playerOneActiveTheme}>
          X - {props.players[0]}
        </div>
        <div className={'border-2 rounded-lg p-4 ' + playerTwoActiveTheme}>
          O - {props.players[1]}
        </div>
      </div>
    );
  } else {
    return (
      <div className="turn-info flex space-x-4">
        <div
          className={'border-2 text-gray-200 border-gray-200 rounded-lg p-4 '}
        >
          Winner is {props.winningPlayer} 🎉
        </div>
      </div>
    );
  }
}
