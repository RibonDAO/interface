import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const CardContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      max-width: 328px;
    }
    margin-bottom: 30px;
  `}
`;

export const CarouselContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      max-width: 848px;
    }
  `}
`;

export const CardBlank = styled.div`
  ${() => css`
    padding: 12px 16px;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    height: 123px;
    width: 206px;
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;
  font-weight: 900;
  margin-bottom: 16px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 36px;
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

export const GivingsContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 28px;
    width: 100%;
    @media (min-width: ${theme.breakpoints.pad}) {
    }
  `}
`;

export const GivingsCardContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

export const GivingsCard = styled.div`
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
  border-radius: 16px;
  width: 206px;
  display: inline-block;
`;

export const GivingDate = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 12px;
  `}
`;

export const GivingText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 8px;
  `}
`;

export const ProcessingGivingText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 8px;
  `}
`;

export const ProcessingGivingTextCoin = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 14px;
    font-weight: 400;
  `}
`;

export const GivingTextCoin = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 14px;
    font-weight: 400;
  `}
`;

export const StatusContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ProcessingText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 12px;
    font-weight: 400;
  `}
`;

export const TransactionLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 12px;
    font-weight: 400;
  `}
`;
