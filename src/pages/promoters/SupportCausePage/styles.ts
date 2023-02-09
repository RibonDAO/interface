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

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(112)};
`;

export const ContentContainer = styled.div`
  max-width: 472px;
  margin-top: ${({ theme }) => theme.spacing(24)};
  border-radius: 8px;
  position: relative;
  overflow-x: hidden;
`;

export const DonateContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(24)};
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const GivingContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(0, 32)};
  display: grid;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
    grid-template-columns: 1fr 1fr;
  }
`;

export const ContributionContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-right: ${({ theme }) => theme.spacing(32)};
    margin-bottom: ${({ theme }) => theme.spacing(24)};
  }
`;

export const CommunityAddContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-top: ${({ theme }) => theme.spacing(0)};
    margin-left: ${({ theme }) => theme.spacing(32)};
  }
`;

export const CommunityAddText = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CommunityAddValue = styled.p`
  ${stylizedDisplayXs}

  color: ${({ theme }) => theme.colors.brand.secondary[300]};
`;

export const CommunityAddButton = styled(ButtonComponent)`
  margin-top: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-color: ${({ theme }) => theme.colors.brand.secondary[700]};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
`;

export const DonateButton = styled(ButtonComponent)`
  border-color: ${({ theme }) => theme.colors.brand.secondary[300]};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.brand.secondary[300]};
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
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
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[800]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayLg}
  }
`;

export const SupportImage = styled.img`
  width: 100%;

  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;

export const Intersection = styled.img`
  position: absolute;
  z-index: 1;
  transform: translate(0px, -100%);
`;

export const UserBalanceText = styled.p`
  ${defaultBodySmSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const UserBalanceTextHighlight = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.secondary[400]};
`;

export const RefundText = styled.p`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;
