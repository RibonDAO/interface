import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: absolute;
    width: 100%;
    max-width: 300px;
    z-index: 999;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 8px;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 8px;
    padding: 8px 16px 8px 16px;
  `}
`;

export const OptionContainer = styled.div`
  ${({ theme }) => css`
    padding: 8px 16px;
    background-color: ${theme.colors.bgGray};
    width: 100%;

    &:hover {
      background-color: ${theme.colors.hoverGray};
      cursor: pointer;
    }
  `}
`;

export const OptionText = styled.h4`
  font-weight: bold;
  line-height: 22px;
`;
