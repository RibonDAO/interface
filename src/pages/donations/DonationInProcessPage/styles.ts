import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 360px;
    height: 100vh;
    margin: 0 auto;
  `}
`;

export const AnimationContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

export const LoaderContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  `}
`;

export const DividerContainer = styled.span`
  ${() => css`
    margin: 20px 156px;
    text-align: center;
  `}
`;

export const AnimationText = styled.h2`
  ${({ theme }) => css`
    margin: 8px 0;
    color: ${theme.colors.ribonBlue};
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

export const ImpactText = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    text-align: center;
  `}
`;
