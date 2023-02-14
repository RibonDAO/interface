import styled from "styled-components";

export const Container = styled.div<{ visible: boolean }>`
  width: 100%;
  height: ${window.innerHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral[800]};
  animation: ${({ visible }) =>
    visible ? "reveal-overlay 0.3s ease-in-out" : "none"};

  > div {
    animation: ${({ visible }) =>
      visible ? "reveal-stories 0.3s ease-in-out" : "none"};
  }

  @keyframes reveal-overlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes reveal-stories {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }
`;
