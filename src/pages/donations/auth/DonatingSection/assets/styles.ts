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
  justify-content: center;
  align-items: center;
`;

export const RotatingSvg = styled.svg`
  animation: ${rotate} 6s linear infinite;
  width: 312px;
  height: 312px;
`;
