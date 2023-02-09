import styled from "styled-components";
import {
  stylizedDisplayLg,
  stylizedDisplayXs,
} from "styles/typography/stylized";
import {
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";
import WaveCut from "assets/images/wave-cut.svg";

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(112)};
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  border-radius: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 296px;
  }
`;

export const NonProfitsListContainer = styled.div`
  margin-inline: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 0;
    width: 100%;
  }
`;

export const DonateContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const GivingContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(0, 32)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`;

export const ContributionContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(32)};
    padding: ${({ theme }) => theme.spacing(0, 16)};
  }
`;

export const CommunityAddText = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CommunityAddValue = styled.p`
  ${stylizedDisplayXs}

  color: ${({ theme }) => theme.colors.brand.tertiary[200]};
`;

export const CommunityAddButton = styled(ButtonComponent)`
  margin-top: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-color: ${({ theme }) => theme.colors.brand.tertiary[800]};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const DonateButton = styled(ButtonComponent)`
  border-color: ${({ theme }) => theme.colors.brand.tertiary[200]};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[200]};
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const BackgroundImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    right: 0;
    bottom: -200px;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayXs}

  margin: ${({ theme }) => theme.spacing(4, 0)};
  margin-right: 5%;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[800]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayLg}
  }
`;

export const SupportImage = styled.img`
  mask-image: url(${WaveCut});
  mask-size: 100% 100%;
  width: 100%;
  height: 136px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const UserBalanceText = styled.p`
  ${defaultBodySmSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const UserBalanceTextHighlight = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.tertiary[400]};
`;

export const RefundText = styled.p`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TooltipSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
  justify-content: center;
`;
