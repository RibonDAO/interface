import styled, { css } from "styled-components";

export const Container = styled.div<{
  backgroundColor: string;
  border: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  border-radius: 8px;
  background: ${(props) =>
    props.backgroundColor || props.theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(16)};
    padding: ${({ theme }) => theme.spacing(32)};
    ${(props) =>
      props.border &&
      css`
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.neutral[100]};
      `}
  }
`;
