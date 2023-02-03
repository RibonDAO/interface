import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin: ${({ theme }) => theme.spacing(4, 0)};
`;
