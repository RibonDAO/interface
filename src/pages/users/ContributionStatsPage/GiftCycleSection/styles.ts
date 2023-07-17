import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";

export const Container = styled.div``;

export const GiftCard = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  border-radius: 8px;
  background: transparent;
  margin-left: -16px;
  margin-right: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(16)};
    margin-left: 0;
    margin-right: 0;
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
  padding: ${({ theme }) => theme.spacing(4, 8, 4, 8)};
  border-radius: 30px;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
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
  ${defaultBodyXsRegular};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
`;
