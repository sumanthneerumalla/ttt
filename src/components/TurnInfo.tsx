export default function TurnInfo(props: { turn: number; players: string[] }) {
  const colorToggleClasses = [
    'text-gray-200 border-gray-200',
    'text-purple-500 border-purple-500',
  ];
  const playerOneActiveTheme = colorToggleClasses[props.turn % 2];
  const playerTwoActiveTheme = colorToggleClasses[(props.turn + 1) % 2];

  // Use the gameState prop to render the component
  return (
    <div className="turn-info flex space-x-4">
      <div
        className={
          'border-2 border-grey rounded-lg p-4 ' + playerOneActiveTheme
        }
      >
        X - {props.players[0]}
      </div>
      <div
        className={
          'border-2 border-grey rounded-lg p-4 ' + playerTwoActiveTheme
        }
      >
        O - {props.players[1]}
      </div>
    </div>
  );
}
