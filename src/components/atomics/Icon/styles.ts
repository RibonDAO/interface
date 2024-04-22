import styled from "styled-components";

export const Icon = styled.span<{
  color?: string;
  size?: string;
  withCircle?: boolean;
  backgroundColor?: string;
  hoveredBackgroundColor?: string;
}>`
  font-size: ${(props) => props.size || props.theme.icons.xs};
  color: ${(props) => props.color || props.theme.colors.neutral[500]};

  ${(props) =>
    props.withCircle &&
    `
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${props.backgroundColor || props.theme.colors.neutral10};
    padding: 0.20rem;
    `}

  ${(props) =>
    props.backgroundColor &&
    `
    display: inline-flex;
    background-color: ${props.backgroundColor || props.theme.colors.neutral10};
    justify-content: center;
    align-self: center;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px;

    &:hover {
      background-color: ${props.hoveredBackgroundColor || props.backgroundColor}
    }
  `}
`;
