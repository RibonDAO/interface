import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 312px;
  height: 312px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RotatingSvg = styled.svg`
  width: 312px;
  height: 312px;
  animation: ${rotate} 6s linear infinite;
`;
