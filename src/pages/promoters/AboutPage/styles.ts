import styled from "styled-components";

export const Container = styled.iframe`
  width: 100%;
  min-height: 100vh;
  margin-bottom: -100px;
  border: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: calc(${window.innerHeight} - 76px);
    min-height: unset;
  }
`;
