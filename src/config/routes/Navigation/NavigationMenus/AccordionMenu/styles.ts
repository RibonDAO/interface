import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div<{ visible: boolean }>`
  width: 100%;
  position: absolute;
  bottom: 70px;
  z-index: ${({ theme }) => theme.zindex.below};
  display: flex;
  flex-direction: column;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

export const MenuSwiper = styled.div<{ pressed: boolean }>`
  width: 100%;
  height: 40px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, pressed }) =>
    pressed ? theme.colors.neutral[500] : theme.colors.neutral[50]};
  cursor: pointer;
  transition: background-color 0.05s;
`;

export const Menu = styled.div<{ collapsed: boolean }>`
  padding-inline: 15px;
  width: 100%;
  height: ${({ collapsed }) => (collapsed ? "50px" : "0px")};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow-y: hidden;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.neutral[50]};
  transition: height 0.15s;
`;

export const MenuItem = styled(Link)<{ $active: boolean }>`
  margin-block: 10px;
  padding-block: auto;
  width: 47%;
  max-height: 25px;
  border: solid 1px ${({ theme }) => theme.colors.neutral[500]};
  border-radius: 5px;
  font-weight: ${({ theme }) => theme.font.semibold};
  text-align: center;
  text-decoration: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.neutral[500] : theme.colors.neutral[50]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.neutral10 : theme.colors.neutral[500]};

  :hover {
    background-color: ${({ theme }) => theme.colors.neutral[500]};
    color: ${({ theme }) => theme.colors.neutral10};
  }
`;

export const Icon = styled.img<{ reversed?: boolean }>`
  height: 10px;
  transform: ${({ reversed }) =>
    reversed ? "rotate(180deg)" : "rotate(0deg)"};
`;
