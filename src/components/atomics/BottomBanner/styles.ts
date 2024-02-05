import styled from "styled-components";
import {
  defaultBodySmSemibold,
  defaultBodyXsSemibold,
} from "styles/typography/default";

export const Container = styled.div<{ isNavigationVisible: boolean }>`
  padding-block: ${({ theme }) => theme.spacing(12)};
  padding-inline: ${({ theme }) => theme.spacing(16)};
  width: 100%;
  position: fixed;
  right: 0;
  bottom: ${({ isNavigationVisible }) =>
    isNavigationVisible ? "76px" : "0px"};
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.brand.secondary[300]};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: unset;
    border-radius: ${({ theme }) => theme.spacing(8)};
    top: unset;
    right: ${({ theme }) => theme.spacing(32)};
    bottom: ${({ theme }) => theme.spacing(32)};
  }
`;

export const Text = styled.p`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.secondary[900]};
`;

export const CTA = styled.p`
  ${defaultBodyXsSemibold}

  padding-block: ${({ theme }) => theme.spacing(4)};
  padding-inline: ${({ theme }) => theme.spacing(8)};
  border-radius: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.brand.secondary[700]};
  color: ${({ theme }) => theme.colors.neutral10};
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
