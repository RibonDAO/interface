import styled from "styled-components";
import { stylizedHeadingLarge } from "styles/typography/stylized";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedHeadingLarge}
  margin: 0;
`;

export const CausesContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 910px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 24px;
  }
`;

export const CausesCardContainer = styled.div``;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green30};
  }
`;
