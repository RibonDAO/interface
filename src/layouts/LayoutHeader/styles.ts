import styled from "styled-components";

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div<{ outline: boolean }>`
  background-color: ${({ theme, outline }) =>
    outline ? theme.colors.brand.primary[800] : theme.colors.neutral10};
`;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Settings = styled.img`
  cursor: pointer;
`;
