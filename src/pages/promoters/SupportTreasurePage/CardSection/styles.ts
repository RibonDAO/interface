import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import {
  defaultBodyXsSemibold,
  defaultBodyXsRegular,
  defaultBodyMdBold,
} from "styles/typography/default";

export const CardSectionContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 120px;
`;

export const Subtitle = styled.h2`
  ${defaultBodyMdBold}

  &:nth-child(3) {
    margin-top: 18px;
  }
`;

export const ValuesContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

export const CardValueButton = styled(Button)`
  ${defaultBodyXsSemibold}

  max-width: 112px;
  height: 30px;
  border-radius: 66px;
`;

export type ButtonContainerProps = {
  topButton?: boolean;
};

export const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;
  height: 80px;
  padding: 12px 16px;
  position: fixed;
  right: 0;
  bottom: ${({ topButton }) => (topButton ? "70px" : "0")};
  left: 0;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  align-self: end;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 -4px 4px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 60px;
    padding: 0;
    position: static;
    box-shadow: none;

    button {
      height: 40px;
    }
  }
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const GivingValue = styled.h2`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const NetGivingValue = styled.p`
  color: ${({ theme }) => theme.colors.gray30};
`;

export const ServiceFeesValue = styled.p`
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CryptoGivingValue = styled.p`
  ${defaultBodyXsRegular}

  margin-bottom: 32px;
  font-style: italic;
  line-height: 19.2px;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CardImpact = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ImpactSectionContainer = styled.div``;

export const SubtitleContainer = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
`;

export const ImpactSimulatorContainer = styled.div`
  margin-bottom: 14px;
`;

export const CardImpactImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 14px;
  border-radius: 50px;
  object-fit: cover;
`;

export const CardImpactText = styled.h4`
  color: ${({ theme }) => theme.colors.gray40};

  span {
    display: inline-block;
    color: ${({ theme }) => theme.colors.green30};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    span {
      display: inline;
    }
  }
`;

export const QuestionIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 4px;
  cursor: pointer;
`;
