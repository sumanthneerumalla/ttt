import Head from "next/head";
import Link from "next/link";

// import { api } from "~/utils/api";

export default function Home() {
  const logMove = (e: any) => {
    console.log(e.target.id);
  }
  
  const generateTable = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const cells = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j + 1
        cells.push(<td
          id={index.toString()} key={index} onClick={logMove}>{index}</td>);
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };
  
  return (
    <div className="h-full w-full bg-purple-300">
      <div className="container mx-auto" id="board">
        <table>
          {generateTable()}
        </table>
        <div className="container mx-auto" id="gameInfo">
          <div className="" id="p1Info"> P1 score</div>
          <div className="" id="tie">tie score</div>
          <div className="" id="p2Info">P2 Score</div>

        </div>

      </div>
    </div>
  );
}
