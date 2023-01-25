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
  margin-bottom: 100px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-top: 24px;
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
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const GivingContainer = styled.div`
  margin-bottom: 24px;
  padding: 0 34px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const ContributionContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-bottom: 34px;
    padding: 0 18px;
  }
`;

export const CommunityAddText = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const CommunityAddValue = styled.p`
  ${stylizedDisplayXs}

  color: ${({ theme }) => theme.colors.red20};
`;

export const CommunityAddButton = styled(ButtonComponent)`
  margin-top: 8px;
  padding: 4px;
  border-color: ${({ theme }) => theme.colors.red40};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.red40};
`;

export const DonateButton = styled(ButtonComponent)`
  border-color: ${({ theme }) => theme.colors.red20};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.red20};
  color: ${({ theme }) => theme.colors.red40};
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

  margin: 4px 0;
  margin-right: 5%;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.gray40};

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
  background-color: ${({ theme }) => theme.colors.gray10};
`;

export const UserBalanceText = styled.p`
  ${defaultBodySmSemibold}

  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const UserBalanceTextHighlight = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.red30};
`;

export const RefundText = styled.p`
  ${defaultBodyXsRegular}

  margin-top: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TooltipSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;
