import styled, { css } from "styled-components";

type Props = {
  processing?: boolean;
};

export const Container = styled.div`
  ${({ theme }) => css`
    height: 123px;
    margin: 8px;
    max-width: 206px;
    padding: 12px 16px;
    border-radius: 16px;
    background: ${theme.colors.white};
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
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
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    text-decoration: none;
    color: ${theme.colors.black};
  `}
`;

export const SpinnerSection = styled.a`
  ${({ theme }) => css`
    margin-top: 10px;
    display: flex;
    font-size: 12px;
    gap: 10px;
    text-decoration: none;
    color: ${theme.colors.ribonBlue};
  `}
`;

export const Image = styled.img``;
