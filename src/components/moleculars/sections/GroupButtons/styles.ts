import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

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
  margin-right: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4, 8)};
  border: 1px solid
    ${(props) => (props.outline ? props.borderColorOutline : props.borderColor)};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.backgroundColorOutline : props.backgroundColor};
  color: ${(props) =>
    props.outline ? props.textColorOutline : props.textColor};
`;

export const ButtonText = styled.p`
  ${defaultBodyXsSemibold}
`;

export const Container = styled.div`
  width: 100%;
`;
