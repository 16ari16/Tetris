import { TETROMINOS } from '../constants/tetrominos';
import { TetrominoType, Tetromino } from '../types/types';

export const getRandomTetromino = (): TetrominoType => {
  const pieces: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

export const createNewPiece = (): Tetromino => {
  const type = getRandomTetromino();
  const { shape, color } = TETROMINOS[type];
  return {
    shape,
    color,
    position: { x: Math.floor(10 / 2) - Math.floor(shape[0].length / 2), y: 0 }
  };
};

export const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotatedShape = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );

  return {
    ...piece,
    shape: rotatedShape
  };
};