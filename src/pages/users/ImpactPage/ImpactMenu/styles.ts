import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-wrap: normal;
  }
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
  min-width: 200px;
  height: 44px;
  color: ${({ theme, active }) =>
    active ? theme.colors.green40 : theme.colors.gray30};
  cursor: pointer;

  border-bottom: ${({ theme, active }) =>
    active
      ? `3px solid ${theme.colors.green30}`
      : `1px solid ${theme.colors.gray20}`};
`;
export const EmptySectionContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  align-self: center;
  text-align: center;
`;

export const EmptyImage = styled.img`
  max-width: 300px;
`;

export const EmptyTitle = styled.p`
  ${defaultBodyMdBold}
  width: 100%;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const EmptyText = styled.span`
  ${defaultBodyMdRegular}
  max-width: 392px;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const EmptyButton = styled(Button)`
  width: 196px;
  color: ${({ theme }) => theme.colors.green40};
`;