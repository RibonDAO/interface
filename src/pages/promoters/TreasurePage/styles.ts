import styled from "styled-components";
import {
  defaultHeadingLg,
  defaultBodyXsRegular,
  defaultBodyMdBold,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";
import { getPrimary } from "styles/colors/utils";

export const Container = styled.div``;

export const CardContainer = styled.div`
  margin-bottom: 30px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 328px;
  }
`;

export const CarouselContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 848px;
  }
`;

export const CardBlank = styled.div`
  width: 206px;
  height: 123px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin: 0;
  margin-bottom: 16px;
`;

export const TreasureText = styled.h3`
  ${defaultHeadingLg}

  margin-bottom: 8px;
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;

export const TreasureTextCoin = styled.span`
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;

export const SectionTitle = styled.h2`
  ${defaultBodyMdBold}

  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray40};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin: 8px 0;
  }
`;

export const GivingsContainer = styled.div`
  width: 100%;
  margin-top: 28px;
`;

export const GivingsCardContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const GivingsCard = styled.div`
  width: 206px;
  padding: 12px 16px;
  border-radius: 16px;
  display: inline-block;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const GivingDate = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const GivingTextCoin = styled.span`
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;

export const StatusContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ProcessingText = styled.span`
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;

export const TransactionLink = styled.a`
  color: ${({ theme }) => theme.colors.gray40};
`;
