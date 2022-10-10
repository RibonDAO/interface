import styled from "styled-components";

export const SlideCardsContainer = styled.div`
  position: relative;
`;

type NavigationProps = {
  visible?: boolean;
};

export const Slider = styled.div`
  scroll-behavior: smooth;
  margin-top: 20px;
  padding-bottom: 30px;
  display: grid;
  grid-auto-columns: 85%;
  grid-auto-flow: column;
  grid-gap: 14px;
  overflow: visible;
  overflow-x: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    grid-auto-columns: auto;
    grid-column-gap: 24px;
  }
`;

export const LeftSide = styled.div<NavigationProps>`
  width: 100px;
  height: 100%;
  margin-left: -20px;
  position: absolute;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  justify-content: start;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 100%) 0%,
    rgba(255, 255, 255, 100%) 21%,
    rgba(255, 255, 255, 40%) 74%,
    rgba(0, 212, 255, 0%) 100%
  );
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.1s linear, opacity 0.1s linear;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    opacity: ${({ visible }) => (visible ? "1" : "0")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  }
`;

export const RightSide = styled.div<NavigationProps>`
  width: 100px;
  height: 100%;
  margin-right: -20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  justify-content: end;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 100%) 0%,
    rgba(255, 255, 255, 100%) 21%,
    rgba(255, 255, 255, 40%) 74%,
    rgba(0, 212, 255, 0%) 100%
  );
  opacity: 0;
  transition: visibility 0.1s linear, opacity 0.1s linear;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    opacity: ${({ visible }) => (visible ? "1" : "0")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  }
`;

export const RoundButton = styled.button`
  width: 40px;
  height: 40px;
  border: solid 2px ${({ theme }) => theme.colors.green20};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.neutral10};
`;
