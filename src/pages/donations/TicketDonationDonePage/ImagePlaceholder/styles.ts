import styled from "styled-components";

export const CardImageContainer = styled.div<{ width: number, height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;