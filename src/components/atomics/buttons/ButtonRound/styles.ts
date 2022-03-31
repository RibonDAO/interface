import styled, { css } from "styled-components";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  ribonsColor?: string;
  leftIcon?: string;
  disabled?: boolean;
};

export const Container = styled.button`
  ${({ disabled, textColor, borderColor, backgroundColor }: Props) => css`
    position: relative;
    border: 1px solid black;
    border-radius: 16px;
    padding: 4px 16px;
    height: 28px;
    font-size: 12px;
    font-weight: 700;
    line-height: 170%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundColor};
    border-color: ${borderColor || backgroundColor};
    color: ${textColor};
    opacity: ${disabled ? 0.5 : 1};

    media :hover {
      cursor: pointer;
    }

    #left-icon {
      position: absolute;
      left: 8px;
    }

    svg {
      margin-left: 2px;

      path {
        fill: ${(props: Props) => props.ribonsColor};
      }
    }
  `}
`;
