import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const CardContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      width: 50%;
    }
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;
  font-weight: 900;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 24px;
    }
  `}
`;

export const FundText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 8px;
  `}
`;

export const FundTextCoin = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 14px;
    font-weight: 400;
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    font-size: 14px;
    color: ${theme.colors.darkGray};
    margin-bottom: 28px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 8px 0 28px 0;
    }
  `}
`;

export const SectionTitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    margin-bottom: 8px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 8px 0;
    }
  `}
`;
