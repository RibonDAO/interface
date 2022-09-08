import { HighlightedTextH1 } from "components/atomics/typography/HighlightedText/styles";
import styled from "styled-components";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled(HighlightedTextH1)`
  margin: 0;
`;

export const CausesContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 8px;
  column-gap: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 70%;
    margin-top: 56px;
    row-gap: 16px;
    column-gap: 12px;
  }
`;

export const CausesCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGray};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mediumGreen};
  }
`;
