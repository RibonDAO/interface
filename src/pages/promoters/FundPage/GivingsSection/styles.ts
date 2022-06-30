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

export const GivingText = styled.span`
  ${({ theme }) => css`
    width: 147px;
    height: 44px;
    font-weight: 700;
    color: ${theme.colors.darkGray};
    font-size: 14px;
    text-align: center;
    margin-top: 13px;
    margin-bottom: 12px;
    line-height: 160%;
  `}
`;

export const CardBlank = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 27px;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    width: 206px;
    height: 123px;
    left: 16px;
    top: 357px;
  `}
`;

export const Image = styled.img`
  ${() => css`
    width: 30%;
    align-items: center;
    margin-top: 18px;
  `}
`;

export const SectionTitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    margin-top: 28px;
  `}
`;
