import styled from "styled-components";
import { Input } from "../InputText/styles";

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zindex.dropdown};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const InputAutoComplete = styled(Input)<{
  borderColor?: Record<string, any>;
  textColor?: string;
}>``;

export const OptionContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(8, 16)};
  background-color: ${({ theme }) => theme.colors.neutral10};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    cursor: pointer;
  }
`;
