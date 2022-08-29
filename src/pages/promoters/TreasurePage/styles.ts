import styled from "styled-components";

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
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;

export const Title = styled.h1`
  margin: 4px 0;
  margin-bottom: 16px;
  font-weight: 900;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 36px;
  }
`;

export const TreasureText = styled.p`
  margin-bottom: 8px;
  font-weight: 900;
  font-size: 36px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const TreasureTextCoin = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const SectionTitle = styled.p`
  margin-bottom: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGray};

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
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;

export const GivingDate = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const GivingText = styled.p`
  margin-bottom: 8px;
  font-weight: 900;
  font-size: 36px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const ProcessingGivingText = styled(GivingText)`
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const GivingTextCoin = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const ProcessingGivingTextCoin = styled(GivingTextCoin)`
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const StatusContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ProcessingText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const TransactionLink = styled.a`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
`;
