import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin-right: ${({ theme }) => theme.spacing(40)};
`;
export const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NonProfitsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(20)};
`;

export const CausesCardContainer = styled.div``;

export const NonProfitsListContainer = styled.div`
  margin-inline: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 0;
    max-width: 900px;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.brand.primary[300]};
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  margin-left: ${({ theme }) => theme.spacing(16)};
  overflow: visible;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 12px;
    margin-left: 0px;

    :nth-of-type(1) {
      margin-left: 0px;
    }
  }
`;

export const TooltipSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
  justify-content: center;
`;

export const EmptySectionContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(40, 0)};
  display: flex;
`;

export const EmptySectionBox = styled.div`
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
