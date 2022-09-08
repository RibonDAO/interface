import Button from "components/atomics/buttons/Button";
import { HighlightedTextH1 } from "components/atomics/typography/HighlightedText/styles";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const Title = styled(HighlightedTextH1)`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Subtitle = styled.h5`
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const CardsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-evenly;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  }
`;

export const CardButton = styled(Button)`
  width: 100px;
  margin: 16px 0;
  align-self: center;
`;

export const EmptySectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: calc(100% - 400px);
  }
`;
