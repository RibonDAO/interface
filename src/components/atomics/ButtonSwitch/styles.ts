import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const BoxIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerSwitch = styled.div`
  margin: 0 4px;
`;

export const Text = styled.p`
  ${({ color }) => css`
    font-size: 14px;
    font-weight: 400;
    color: ${color};
  `}
`;
