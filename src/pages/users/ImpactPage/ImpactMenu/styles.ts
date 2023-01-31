import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 40px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MenuItem = styled.div<{ active: boolean }>`
  ${defaultBodyMdMedium}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px 0px;
  width: 100%;
  height: 44px;
  color: ${({ theme, active }) =>
    active ? theme.colors.green40 : theme.colors.gray30};
  cursor: pointer;

  border-bottom: ${({ theme, active }) =>
    active
      ? `3px solid ${theme.colors.green30}`
      : `1px solid ${theme.colors.gray20}`};
`;
