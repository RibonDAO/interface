import styled from "styled-components";
import { Input } from "../InputText/styles";

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zindex.dropdown};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;

export const InputAutoComplete = styled(Input)``;

export const OptionContainer = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.xLightGray};
    cursor: pointer;
  }
`;
