export type Position = {
  x: number;
  y: number;
};

export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type Tetromino = {
  shape: number[][];
  color: string;
  position: Position;
};

export type GameState = {
  board: string[][];
  currentPiece: Tetromino | null;
  score: number;
  gameOver: boolean;
  isPaused: boolean;
};