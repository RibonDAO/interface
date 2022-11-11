import styled from "styled-components";
import { defaultComponentTextSmall } from "styles/typography/default";


export const Button = styled.button<{
  outline?: boolean;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  textColor?: string;
  textColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
}>`
  width: auto;
  height: 32px;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) =>
    props.outline
      ? props.borderColorOutline
      : props.borderColor};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.backgroundColorOutline : props.backgroundColor};
  color: ${(props) =>
    props.outline ? props.textColorOutline : props.textColor};
`;

export const ButtonText = styled.p`
  ${defaultComponentTextSmall};
`;

export const Container = styled.div`
  width: 100%;
`;