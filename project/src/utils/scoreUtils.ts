export const calculateScore = (completedLines: number): number => {
  return completedLines * 100;
};

export const checkCompletedLines = (board: string[][]): {
  updatedBoard: string[][],
  completedLines: number
} => {
  let completedLines = 0;
  const updatedBoard = board.filter(row => {
    if (row.every(cell => cell !== '')) {
      completedLines++;
      return false;
    }
    return true;
  });
  
  // Add new empty lines at the top
  while (updatedBoard.length < 20) {
    updatedBoard.unshift(Array(10).fill(''));
  }

  return { updatedBoard, completedLines };
};