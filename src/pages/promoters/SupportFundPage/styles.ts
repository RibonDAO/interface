import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 472px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  margin: 4px 0;
  margin-bottom: 48px;
  font-weight: 900;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 36px;
  }
`;
