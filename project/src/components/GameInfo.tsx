import React from 'react';
import styled from 'styled-components';

const StyledGameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  color: white;
`;

const Score = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  
  &:hover {
    background-color: #45a049;
  }
`;

interface GameInfoProps {
  score: number;
  gameOver: boolean;
  isPaused: boolean;
  onStartGame: () => void;
  onTogglePause: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ 
  score, 
  gameOver, 
  isPaused,
  onStartGame,
  onTogglePause 
}) => (
  <StyledGameInfo>
    <Score>Счёт: {score}</Score>
    {gameOver && (
      <>
        <h2>Игра окончена!</h2>
        <Button onClick={onStartGame}>Новая игра</Button>
      </>
    )}
    {!gameOver && (
      <Button onClick={onTogglePause}>
        {isPaused ? 'Продолжить' : 'Пауза'}
      </Button>
    )}
  </StyledGameInfo>
);