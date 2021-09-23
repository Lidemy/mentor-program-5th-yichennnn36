import React from 'react';
import { Board, Row, Footer } from './GameAppStyle';
import useBoard from '../../customHooks/useBoard';
import Gobang from '../Gobang/Gobang';
import GameInfo from '../GameInfo/GameInfo';

const Game = () => {
  const { board, winner, setBoard, isBlackNext, handleChessClick } = useBoard();

  return (
    <>
      <div className="game">
        <Board>
          {
            board.map((row, y) => {
              return (
                <Row key={y}>
                  {
                    row.map((col, x) => {
                      return (
                        <Gobang
                          key={x}
                          rowIndex={y}
                          colIndex={x}
                          board={board}
                          handleChessClick={handleChessClick}
                          winner={winner}
                        />
                      )
                    })
                  }
                </Row>
              )
            })
          }
        </Board>
        <GameInfo isBlackNext={isBlackNext.current} winner={winner} board={board} setBoard={setBoard} />
      </div>
      <Footer>
        Copyright © 2021 YichenLiu Gobang All rights Reserved.
      </Footer>
    </>
  );
};

export default Game;
