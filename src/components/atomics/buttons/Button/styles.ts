import styled, { css } from "styled-components";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  ribonsColor?: string;
  leftIcon?: string;
  disabled?: boolean;
  borderRadius?: string;
  size?: string;
};

export const Container = styled.button`
  ${({
    disabled,
    textColor,
    borderColor,
    backgroundColor,
    borderRadius,
    size,
  }: Props) => css`
    width: 100%;
    border: 1px solid #000000;
    border-radius: ${borderRadius || "8px"};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    line-height: 1;
    font-weight: 700;
    background-color: ${backgroundColor};
    border-color: ${borderColor || backgroundColor};
    color: ${textColor};
    opacity: ${disabled ? 0.5 : 1};

    ${() =>
      size === "large" &&
      css`
        font-size: 20px;
        padding: 12px 16px;
      `}

    ${() =>
      size === "medium" &&
      css`
        font-size: 16px;
        padding: 11px 16px;
      `}

    ${() =>
      size === "small" &&
      css`
        font-size: 12px;
        padding: 4px 16px;
      `}

    media :hover {
      cursor: pointer;
    }

    #left-icon {
      margin-right: 4px;
    }

    #right-icon {
      margin-left: 4px;
    }

    svg {
      margin-left: 2px;

      path {
        fill: ${(props: Props) => props.ribonsColor};
      }
    }
  `}
`;
