import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RibonsAmount = styled.p`
  ${({ theme }) => css`
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    margin-right: 2px;
    color: ${theme.colors.ribonBlue};
  `}
`;

export const Sparkle = styled.img`
  width: 20px;
  height: 20px;
`;
