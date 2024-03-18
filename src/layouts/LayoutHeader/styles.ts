import styled from "styled-components";

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Container = styled.div<{ outline: boolean; member: boolean }>`
  background-color: ${({ theme, outline, member }) => {
    if (outline && member) {
      return theme.colors.brand.tertiary[600];
    } else if (outline && !member) {
      return theme.colors.brand.primary[800];
    } else {
      return theme.colors.neutral10;
    }
  }};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0 14% 0 calc(14% + 80px);
  }
`;

export const ContainerRight = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
