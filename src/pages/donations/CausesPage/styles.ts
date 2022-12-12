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

export const NonProfitsContainer = styled.div`
  margin-top: 20px;
`;

export const CausesCardContainer = styled.div``;

export const NonProfitsListContainer = styled.div`
  margin-inline: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 0;
    max-width: 900px;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green30};
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: 32px;
  margin-left: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 8px;
  }
`;
