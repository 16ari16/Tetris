import React from 'react';
import styled from 'styled-components';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { useGameLogic } from './hooks/useGameLogic';

const Container = styled.div`
  min-height: 100vh;
  background-color: #282c34;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Controls = styled.div`
  margin-top: 20px;
  text-align: center;
  color: white;
`;

function App() {
  const { gameState, startGame, togglePause } = useGameLogic();
  const { board, score, gameOver, isPaused } = gameState;

  return (
    <Container>
      <div>
        <GameContainer>
          <Board board={board} />
          <GameInfo
            score={score}
            gameOver={gameOver}
            isPaused={isPaused}
            onStartGame={startGame}
            onTogglePause={togglePause}
          />
        </GameContainer>
        <Controls>
          <p>Управление:</p>
          <p>← → для движения</p>
          <p>↑ для поворота</p>
          <p>↓ для ускорения падения</p>
          <p>P для паузы</p>
        </Controls>
      </div>
    </Container>
  );
}

export default App;