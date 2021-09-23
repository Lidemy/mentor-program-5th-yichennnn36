import { Info, GameDesc, ChessIcon, WinnerInfo, Button } from './GameInfoStyle';

const RestartBtn = ({ handleRestart }) => {
  return (
    <Button onClick={handleRestart}>RESTART</Button>
  );
};

const GameInfo = ({ isBlackNext, winner, board, setBoard }) => {

  const handleRestart = () => {
    setBoard(board.map(row => row.map(col => null)));
  };

  return (
    <Info>
      <h1>五子棋 Gobang</h1>
      {!winner && (
        <>
          <GameDesc>
            <h3>Next Player ► ▷ ► {isBlackNext ? '黑子' : '白子'}</h3>
            <ChessIcon isBlackNext={isBlackNext} />
          </GameDesc>
          <RestartBtn handleRestart={handleRestart} />
        </>
      )}
      {winner && (
        <WinnerInfo>
          <div>
            {winner === 'black' ? `> 獲勝的是黑子 <` : '> 獲勝的是白子 <'}
          </div>
          <RestartBtn handleRestart={handleRestart} />
        </WinnerInfo>
      )}
    </Info>
  )
};

export default GameInfo;