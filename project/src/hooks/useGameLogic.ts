import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types/types';
import { createEmptyBoard, getBoardWithPiece, isValidMove } from '../utils/boardUtils';
import { createNewPiece, rotatePiece } from '../utils/pieceUtils';
import { calculateScore, checkCompletedLines } from '../utils/scoreUtils';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    score: 0,
    gameOver: false,
    isPaused: false
  });

  const moveLeft = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const isValid = isValidMove(gameState.currentPiece, gameState.board, -1, 0);
    if (isValid) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: {
            ...prev.currentPiece!.position,
            x: prev.currentPiece!.position.x - 1
          }
        }
      }));
    }
  }, [gameState.currentPiece, gameState.board, gameState.gameOver, gameState.isPaused]);

  const moveRight = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const isValid = isValidMove(gameState.currentPiece, gameState.board, 1, 0);
    if (isValid) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: {
            ...prev.currentPiece!.position,
            x: prev.currentPiece!.position.x + 1
          }
        }
      }));
    }
  }, [gameState.currentPiece, gameState.board, gameState.gameOver, gameState.isPaused]);

  const moveDown = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const isValid = isValidMove(gameState.currentPiece, gameState.board, 0, 1);
    
    if (isValid) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: {
            ...prev.currentPiece!.position,
            y: prev.currentPiece!.position.y + 1
          }
        }
      }));
    } else {
      // Piece has landed
      const newBoard = getBoardWithPiece(gameState.board, gameState.currentPiece);
      const { updatedBoard, completedLines } = checkCompletedLines(newBoard);
      const newScore = gameState.score + calculateScore(completedLines);
      
      // Check if game is over (piece can't move down at start position)
      const nextPiece = createNewPiece();
      const canPlaceNewPiece = isValidMove(nextPiece, updatedBoard, 0, 0);

      setGameState(prev => ({
        ...prev,
        board: updatedBoard,
        currentPiece: canPlaceNewPiece ? nextPiece : null,
        score: newScore,
        gameOver: !canPlaceNewPiece
      }));
    }
  }, [gameState.currentPiece, gameState.board, gameState.score, gameState.gameOver, gameState.isPaused]);

  const rotate = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const rotatedPiece = rotatePiece(gameState.currentPiece);
    if (isValidMove(rotatedPiece, gameState.board, 0, 0)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece
      }));
    }
  }, [gameState.currentPiece, gameState.board, gameState.gameOver, gameState.isPaused]);

  const togglePause = useCallback(() => {
    if (!gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        isPaused: !prev.isPaused
      }));
    }
  }, [gameState.gameOver]);

  const startGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: createNewPiece(),
      score: 0,
      gameOver: false,
      isPaused: false
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'п') {
        togglePause();
        return;
      }

      if (gameState.isPaused) return;

      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveLeft, moveRight, moveDown, rotate, togglePause, gameState.isPaused]);

  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      startGame();
    }
  }, [gameState.currentPiece, gameState.gameOver, startGame]);

  useEffect(() => {
    if (!gameState.gameOver && gameState.currentPiece && !gameState.isPaused) {
      const interval = setInterval(moveDown, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.gameOver, gameState.currentPiece, gameState.isPaused, moveDown]);

  const displayBoard = getBoardWithPiece(gameState.board, gameState.currentPiece);

  return {
    gameState: {
      ...gameState,
      board: displayBoard
    },
    startGame,
    togglePause
  };
};