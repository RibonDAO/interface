import styled from "styled-components";

export const SlideCardsContainer = styled.div`
  position: relative;
`;

type NavigationProps = {
  visible?: boolean;
};

export const Slider = styled.div`
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding-inline: 17px;
  margin-top: ${({ theme }) => theme.spacing(20)};
  padding-bottom: ${({ theme }) => theme.spacing(32)};
  display: grid;
  grid-auto-columns: 85%;
  grid-auto-flow: column;
  grid-gap: 14px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-inline: 0;
    grid-auto-columns: max-content;
    grid-gap: 24px;
  }
`;

export const LeftSide = styled.div<NavigationProps>`
  width: 0;
  height: 100%;
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
    width: 100px;
    margin-left: -20px;
    opacity: ${({ visible }) => (visible ? "1" : "0")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  }
`;

export const RightSide = styled.div<NavigationProps>`
  width: 0;
  height: 100%;
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
  visibility: hidden;
  transition: visibility 0.1s linear, opacity 0.1s linear;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100px;
    margin-right: -20px;
    opacity: ${({ visible }) => (visible ? "1" : "0")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  }
`;
