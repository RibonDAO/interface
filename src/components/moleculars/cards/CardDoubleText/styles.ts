import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    width: 100%;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.1);
    border-radius: 16px;
    padding: 16px;
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    font-weight: bold;
    color: ${theme.colors.ribonBlack};
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.colors.darkGray};
  `}
`;

export const LeftContainer = styled.div`
  ${() => css`
    width: 67%;
  `}
`;

export const RightContainer = styled.div`
  ${() => css`
    width: 33%;
  `}
`;
