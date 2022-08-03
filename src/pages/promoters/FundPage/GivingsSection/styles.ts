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
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 206px;
    padding: 12px 16px;
    background: ${theme.colors.ribonWhite};
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    height: 123px;
    margin: 8px;
    text-decoration: none;
  `}
`;

export const GivingText = styled.span`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.darkGray};
    font-size: 14px;
    text-align: center;
    line-height: 22px;
  `}
`;

export const CardBlank = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 18px 29px 12px 29px;
    background: ${theme.colors.ribonWhite};
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    gap: 10px;
    max-width: 206px;
  `}
`;

export const Image = styled.img`
  ${() => css`
    height: 40px;
  `}
`;

export const SectionTitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    margin-top: 28px;
  `}
`;
