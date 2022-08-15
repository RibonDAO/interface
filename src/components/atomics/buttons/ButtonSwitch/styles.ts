import styled, { css } from "styled-components";

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
  margin: 0 4px;
`;

export const Text = styled.p`
  ${({ color }) => css`
    font-size: 14px;
    font-weight: 400;
    color: ${color};
  `}
`;
