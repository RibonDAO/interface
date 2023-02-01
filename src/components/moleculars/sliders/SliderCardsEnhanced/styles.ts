import styled from "styled-components";

export const NavigationWrapper = styled.div`
  max-width: 900px;
  position: relative;
`;

export const LeftSide = styled.div<{ visible: boolean }>`
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -20px;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 100%) 0%,
    rgba(255, 255, 255, 100%) 21%,
    rgba(255, 255, 255, 40%) 74%,
    rgba(0, 212, 255, 0%) 100%
  );
  visibility: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    opacity: ${({ visible }) => (visible ? "1" : "0")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
    transition: opacity 0.1s ease-in-out;
  }
`;

export const RightSide = styled.div<{ visible: boolean }>`
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 100%) 0%,
    rgba(255, 255, 255, 100%) 21%,
    rgba(255, 255, 255, 40%) 74%,
    rgba(0, 212, 255, 0%) 100%
  );
  visibility: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  }
`;
