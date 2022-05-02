import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const TextLastCard = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 16px;
    font-weight: 700;
  `}
`;

export const LastCardCarousel = styled.a`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 206px;
    padding: 12px 16px;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    height: 123px;
    margin: 8px;
    text-decoration: none;
  `}
`;

export const GivingText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    margin-bottom: 18px;
    margin-top: 14px;
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
