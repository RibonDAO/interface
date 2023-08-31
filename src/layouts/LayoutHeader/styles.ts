import styled from "styled-components";
import Icon from "components/atomics/Icon";

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Container = styled.div<{ outline: boolean }>`
  background-color: ${({ theme, outline }) =>
    outline ? theme.colors.brand.primary[800] : theme.colors.neutral10};

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

export const Settings = styled(Icon)`
  cursor: pointer;
`;
