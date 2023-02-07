import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const Menu = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(40)};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-wrap: normal;
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  min-height: 216px;
  margin-top: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TooltipText = styled.div`
  display: flex;
`;

export const FirstParagraph = styled.p``;

export const SecondParagraph = styled.p``;

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(40)};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.div<{ active: boolean }>`
  ${defaultBodyMdMedium}

  width: 100%;
  min-width: 200px;
  height: 44px;
  padding: ${({ theme }) => theme.spacing(8, 0, 0)};
  border-bottom: ${({ theme, active }) =>
    active
      ? `3px solid ${theme.colors.green30}`
      : `1px solid ${theme.colors.gray20}`};
  display: flex;
  flex-direction: column;

  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.brand.primary[800] : theme.colors.gray30};
  cursor: pointer;
`;
export const EmptySectionContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(40)};
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
  padding: ${({ theme }) => theme.spacing(8, 16)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;
