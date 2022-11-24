import styled from "styled-components";
import { Link } from "react-router-dom";

export const Menu = styled.div<{ visible: boolean }>`
  padding-block: 10px;
  width: ${({ visible }) => (visible ? "150px" : "0px")};
  border: solid 1px
    ${({ theme, visible }) =>
      visible ? theme.colors.defaultShadow : "transparent"};
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  left: 80px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  justify-content: space-around;
  overflow-x: hidden;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: inset 7px 0 9px -7px ${({ theme }) => theme.colors.defaultShadow};
  transition: width 0.2s;
`;

export const MenuItem = styled(Link)`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.font.semibold};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray30};

  :hover {
    background-color: ${({ theme }) => theme.colors.green30};
    color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: inset 7px 0 9px -7px ${({ theme }) => theme.colors.defaultShadow};
  }
`;
