import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos';
import { Tetromino } from '../types/types';

export const createEmptyBoard = () => 
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(''));

export const getBoardWithPiece = (board: string[][], piece: Tetromino | null) => {
  if (!piece) return board;

  const newBoard = board.map(row => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    });
  });
  return newBoard;
};

export const isValidMove = (piece: Tetromino, board: string[][], offsetX = 0, offsetY = 0) => {
  return piece.shape.every((row, y) =>
    row.every((value, x) => {
      const newX = piece.position.x + x + offsetX;
      const newY = piece.position.y + y + offsetY;
      
      if (value === 0) return true;
      
      if (
        newX < 0 ||
        newX >= BOARD_WIDTH ||
        newY >= BOARD_HEIGHT ||
        (newY >= 0 && board[newY][newX] !== '')
      ) {
        return false;
      }
      
      return true;
    })
  );
};