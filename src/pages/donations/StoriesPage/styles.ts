import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray40};
`;

export const StoriesWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 480px;
    max-height: 720px;
  }
`;

export const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
`;
