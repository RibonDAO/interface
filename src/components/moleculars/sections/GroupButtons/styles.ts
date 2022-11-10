import styled from "styled-components";
import { defaultComponentTextSmall } from "styles/typography/default";


export const Button = styled.button<{
    outline?: boolean;
}>`
  width: auto;
  height: 32px;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) =>
        props.outline
            ? props.theme.colors.green30
            : props.theme.colors.green40};
  border-radius: 4px;
  background-color: ${(props) =>
        props.outline ? props.theme.colors.neutral10 : props.theme.colors.green40};
  color: ${(props) =>
        props.outline ? props.theme.colors.green40 : props.theme.colors.neutral10};
`;

export const ButtonText = styled.p`
  ${defaultComponentTextSmall};
`;

export const Container = styled.div`
  width: 100%;
`;