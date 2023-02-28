import styled from "styled-components";

export const Container = styled.form<{
  borderColor?: Record<string, any>;
  textColor?: string;
}>`
  width: 100%;
  position: relative;

  input {
    border-color: ${(props) =>
      props.borderColor?.default || props.theme.colors.neutral[300]};
    color: ${(props) => props.textColor || props.theme.colors.neutral[900]};

    &:active,
    &:focus {
      border-color: ${(props) =>
        props.borderColor?.active || props.theme.colors.neutral[600]};
    }
  }
`;
