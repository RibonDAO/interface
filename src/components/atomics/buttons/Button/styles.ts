import styled, { css } from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmSemibold,
  defaultBodyXsSemibold,
} from "styles/typography/default";

export const Container = styled.button<{
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  ribonsColor?: string;
  leftIcon?: string;
  disabled?: boolean;
  borderRadius?: string;
  size?: string;
}>`
  ${(props) =>
    props.size === "large" &&
    css`
      ${defaultBodyMdSemibold}

      padding: ${({ theme }) => theme.spacing(12, 16)};
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      ${defaultBodySmSemibold}

      padding: ${({ theme }) => theme.spacing(12, 16)};
    `}
    
  
  ${(props) =>
    props.size === "small" &&
    css`
      ${defaultBodyXsSemibold}

      padding: ${({ theme }) => theme.spacing(8, 16)};
    `}
    
  width: 100%;
  border: 1px solid #000;
  border-color: ${(props) => props.borderColor || props.backgroundColor};
  border-radius: ${(props) => props.borderRadius || "8px"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  #left-icon {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }

  #right-icon {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }

  svg {
    margin-left: ${({ theme }) => theme.spacing(4)};

    path {
      fill: ${(props) => props.ribonsColor};
    }
  }
`;
