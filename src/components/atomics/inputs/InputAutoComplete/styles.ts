import styled, { css } from "styled-components";
import { Input } from "../InputText/styles";

export const Container = styled.div`
  ${() => css`
    width: 100%;
    max-width: 300px;
    z-index: 999;
    border-radius: 5px;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
  `}
`;

export const InputAutoComplete = styled(Input)``;

export const OptionContainer = styled.div`
  ${({ theme }) => css`
    padding: 8px 16px;
    background-color: ${theme.colors.ribonWhite};
    width: 100%;

    &:hover {
      background-color: ${theme.colors.hoverGray};
      cursor: pointer;
    }
  `}
`;

export const OptionText = styled.h4`
  font-weight: 700;
  line-height: 1.6;
`;
