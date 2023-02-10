import Button from "components/atomics/buttons/Button";
import styled from "styled-components";

import {
  defaultBodyMdRegular,
  defaultBodyMdBold,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin: ${({ theme }) => theme.spacing(0)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Subtitle = styled.h5`
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CardsButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  align-self: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-wrap: nowrap;
    align-self: normal;
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

export const CardButton = styled(Button)`
  width: 135px;
  margin: ${({ theme }) => theme.spacing(16, 0)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.brand.primary[300]};
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
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const EmptyText = styled.span`
  ${defaultBodyMdRegular}

  max-width: 392px;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const EmptyButton = styled(Button)`
  width: 196px;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const ImpactMenuContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 960px;
    padding-right: ${({ theme }) => theme.spacing(12)};
  }
`;
