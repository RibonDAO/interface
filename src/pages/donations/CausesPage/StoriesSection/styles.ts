import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray40};
`;
