import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const DebugViewHeader = styled.h3`
  margin-top: 0;
`;

export const EventTable = styled.table`
  width: 100%;

  th {
    text-align: left;
  }

  td {
    padding: 8px 0;
  }
`;

const highlightAnimation = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    background-color: #b9e6b3;
  }
`;

interface HighlightRowProps {
  highlight: boolean;
}

export const HighlightRow = styled.tr<HighlightRowProps>`
  ${({ highlight }) =>
    highlight &&
    css`
      animation: ${highlightAnimation} 1s linear;
    `}
`;
