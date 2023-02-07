import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.div<{ collapsed: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing(112)};
  right: 0;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  div > button {
    padding-inline: ${({ theme, collapsed }) =>
      collapsed ? "0px" : theme.spacing(12)};
    width: ${({ collapsed }) => (collapsed ? "0px" : "100%")};
    right: 0;
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out,
      padding-inline 0.3s ease-in-out;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    top: unset;
    right: ${({ theme }) => theme.spacing(32)};
    bottom: ${({ theme }) => theme.spacing(32)};
  }
`;

export const CtaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const LeftIcon = styled.img``;

export const Button = styled.button<{
  backgroundColor?: string;
  textColor?: string;
}>`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.spacing(4)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  white-space: nowrap;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  cursor: pointer;

  span {
    ${defaultBodySmSemibold}

    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const ToggleButton = styled.button<{
  backgroundColor?: string;
  textColor?: string;
}>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-inline: ${({ theme }) => theme.spacing(12)};
    width: 50px;
    height: 40px;
    margin-left: ${({ theme }) => theme.spacing(4)};
    border: none;
    border-radius: ${({ theme }) => theme.spacing(4)};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    box-sizing: border-box;
    white-space: nowrap;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    cursor: pointer;
  }
`;
