import styled from "styled-components";

export const Icon = styled.span<{ color?: string; size?: string }>`
  font-size: ${(props) => props.size || props.theme.icons.xs};
  color: ${(props) => props.color || props.theme.colors.neutral[500]};
`;
