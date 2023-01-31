import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

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
  ${stylizedDisplayLg}

  margin: ${({ theme }) => theme.spacing(4, 0)};
  margin-bottom: ${({ theme }) => theme.spacing(48)};
`;
