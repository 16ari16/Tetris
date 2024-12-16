import React from 'react';
import styled from 'styled-components';

const StyledBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(20, 30px);
  grid-template-columns: repeat(10, 30px);
  gap: 1px;
  border: 2px solid #333;
  background-color: #111;
  padding: 10px;
`;

const Cell = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color || '#000'};
  border: ${props => props.color ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

interface BoardProps {
  board: string[][];
}

export const Board: React.FC<BoardProps> = ({ board }) => (
  <StyledBoard>
    {board.map((row, y) =>
      row.map((cell, x) => (
        <Cell key={`${y}-${x}`} color={cell} />
      ))
    )}
  </StyledBoard>
);