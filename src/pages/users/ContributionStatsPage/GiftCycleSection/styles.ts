import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";

export const Container = styled.div``;

export const GiftCard = styled.div`
  margin-right: -16px;
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  margin-left: -16px;
  border-radius: 8px;
  background: transparent;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing(16)};
    margin-left: 0;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.neutral[100]};
  }
`;
export const GiftDonationCycleImage = styled.img`
  width: 100%;
  height: 126px;
  object-fit: cover;
`;

export const RealTimeDonationContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(4, 8, 4, 8)};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const RealTimeDonationLabel = styled.span`
  ${defaultBodyXsRegular}

  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
