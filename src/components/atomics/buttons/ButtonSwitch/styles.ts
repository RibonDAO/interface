import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BoxIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerSwitch = styled.div`
  margin: ${({ theme }) => theme.spacing(0, 4)};
`;

export const Text = styled.p`
  color: ${({ color }) => color};
`;
