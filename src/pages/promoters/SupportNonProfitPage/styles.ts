import styled from "styled-components";
import {
  stylizedHeadingLarge,
  stylizedTitleLarge,
} from "styles/typography/stylized";
import {
  defaultParagraphSmall,
  defaultSubtitleMedium,
} from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";
import WaveCut from "assets/images/wave-cut.svg";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const ContentContainer = styled.div`
  width: 296px;
  margin-top: 24px;
  border-radius: 8px;
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
  ${defaultParagraphSmall}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const CommunityAddValue = styled.p`
  ${stylizedTitleLarge}

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
  ${stylizedTitleLarge}

  margin: 4px 0;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.gray40};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedHeadingLarge}
  }
`;

export const SupportImage = styled.img`
  mask-image: url(${WaveCut});
  mask-mode: revert;
  mask-repeat: no-repeat;
  width: 100%;
  height: 136px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  object-fit: cover;
`;

export const UserBalanceText = styled.p`
  ${defaultSubtitleMedium}

  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const UserBalanceTextHighlight = styled.span`
  ${defaultSubtitleMedium}

  color: ${({ theme }) => theme.colors.red30};
`;

export const RefundText = styled.p`
  ${defaultParagraphSmall}

  margin-top: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;
