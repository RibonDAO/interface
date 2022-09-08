import { HighlightedTextH1 } from "components/atomics/typography/HighlightedText/styles";
import styled from "styled-components";

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled(HighlightedTextH1)`
  margin: 4px 0;
`;
