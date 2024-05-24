import Player from "./COMPONENTS/Player";
import GameBoard from "./COMPONENTS/GameBoard";
import Log from "./COMPONENTS/log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./COMPONENTS/winning-combinations";
import GameOver from "./COMPONENTS/GameOver";

const initailGameBoard=[
  [null , null , null],
  [null , null , null],
  [null , null , null]
];



function deriveActivePlayer(gameTurn){
  let currentPlayer = "X";
  if(gameTurn.length>0 && gameTurn[0].player === "X") {
        currentPlayer="O";
  }
  return currentPlayer;

}

function App() {
  const [players , setPlayers]= useState({
    X:"Player 1",
    O: "player 2",
  });

  const [gameTurn , setGameTurn]=useState([]);
  // const [activePlayer , setActivePlayer]= useState("X");

  const activePlayer= deriveActivePlayer(gameTurn);

  let gameBoard= [...initailGameBoard.map(array =>[...array])];

    for(const turn of gameTurn) {
        const {square , player}= turn;
        const {row , col }= square;

        gameBoard[row] [col] = player;
    }

    let winner ;
    for (const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol= gameBoard[combination[0].row] [combination[0].column];
      const secondSquareSymbol= gameBoard[combination[1].row] [combination[1].column];
      const thirdSquareSymbol= gameBoard[combination[2].row] [combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol=== thirdSquareSymbol){
        winner= players[firstSquareSymbol];
      }


    }

    const hasDraw = gameTurn.length ===9 && !winner;

  function handleSelectSquare(rowIndex , colIndex){
    // setActivePlayer((curActivePlayer)=> curActivePlayer === "X" ? "O" : 'X');
    setGameTurn((prevTurn)=> {

      const currentPlayer= deriveActivePlayer(prevTurn);
      
      const updateTurn = [
        { square : {row : rowIndex , col : colIndex}, player: currentPlayer}, ...prevTurn,
      ];
      return updateTurn;
    });
  }
  function handleReStart(){
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol , newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player name="Player2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} reStart={handleReStart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn}/>
    </main>
  );
}

export default App
