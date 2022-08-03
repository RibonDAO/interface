import styled, { css } from "styled-components";

type Props = {
  processing?: boolean;
};

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: 206px;
    padding: 12px 16px;
    background: ${theme.colors.ribonWhite};
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    height: 123px;
    margin: 8px;
  `}
`;

export const FirstText = styled.p`
  ${({ theme }) => css`
    font-style: italic;
    font-size: 12px;
    color: ${theme.colors.darkGray};
  `}
`;

export const MainContent = styled.p`
  ${({ theme }) => css`
    color: ${({ processing }: Props) =>
      processing ? theme.colors.darkGray : theme.colors.ribonBlue};
    font-size: 24px;
    font-weight: 900;
  `}
`;

export const RightMainContent = styled.span`
  ${({ theme }) => css`
    color: ${({ processing }: Props) =>
      processing ? theme.colors.darkGray : theme.colors.ribonBlue};
    font-size: 14px;
    font-weight: 400;
  `}
`;

export const LinkSection = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    text-decoration: none;
  `}
`;

export const SpinnerSection = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 12px;
    display: flex;
    text-decoration: none;
    gap: 10px;
    margin-top: 10px;
  `}
`;

export const Image = styled.img``;
