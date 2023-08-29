import styled from "styled-components";
import {
  defaultBodyXsSemibold,
  defaultHeadingXs,
} from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
export const HeartImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const CounterText = styled.h1`
  ${defaultHeadingXs}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const ImpactedLivesText = styled.p`
  ${defaultBodyXsSemibold}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;
