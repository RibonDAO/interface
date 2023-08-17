import styled from "styled-components";
import {
  stylizedDisplayLg,
  stylizedDisplaySm,
} from "styles/typography/stylized";
import DeleteButtonHover from "assets/icons/delete-icon-hover.svg";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(16)};
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin: 0 14%;
    margin-top: ${({ theme }) => theme.spacing(40)};
    margin-left: calc(14% + 80px);
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin-bottom: ${({ theme }) => theme.spacing(24)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(32)};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(64)};
`;

export const BackArrowButton = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  cursor: pointer;
`;

export const SubscriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(16)};

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
`;

export const PaymentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(16, 20)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-width: 328px;
  }
`;

export const Amount = styled.p`
  ${stylizedDisplaySm}

  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const IconTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 28px;
  height: 28px;

  &:hover {
    background-image: url(${DeleteButtonHover});
  }
`;

export const Text = styled.p`
  ${defaultBodySmMedium}
`;

export const HighlightedText = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;
