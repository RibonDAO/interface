import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 112px);
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: calc(100vh - 256px);
  }
`;
