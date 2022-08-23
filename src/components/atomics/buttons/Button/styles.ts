import styled, { css } from "styled-components";

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
  width: 100%;
  border: 1px solid #000;
  border-color: ${(props) => props.borderColor || props.backgroundColor};
  border-radius: ${(props) => props.borderRadius || "8px"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  line-height: 1;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 20px;
      padding: 12px 16px;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 16px;
      padding: 11px 16px;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 12px;
      padding: 4px 16px;
    `}
      
  #left-icon {
    margin-right: 4px;
  }

  #right-icon {
    margin-left: 4px;
  }

  svg {
    margin-left: 2px;

    path {
      fill: ${(props) => props.ribonsColor};
    }
  }
`;
