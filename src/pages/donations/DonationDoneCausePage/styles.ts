import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodyLgBold,
  defaultBodyMdRegular,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

export const ImageContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  transform: scale(1.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    transform: scale(1.4);
  }
`;

export const Image = styled.img`
  max-width: 100%;
  position: relative;
  align-self: center;
  object-fit: contain;
  transform: rotate(-45deg) scale(1.36);
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
`;

export const DonationValue = styled.h1<{ color: string }>`
  ${stylizedDisplayLg}

  color: ${({ color }) => color};
`;

export const PostDonationText = styled.p`
  ${defaultBodySmRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CauseName = styled.span<{
  isGreen?: boolean;
}>`
  ${defaultBodySmSemibold}

  color: ${(props) =>
    props.isGreen
      ? ({ theme }) => theme.colors.brand.primary[300]
      : ({ color }) => color};
`;

export const FinishButton = styled(Button)<{ background: string }>`
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ background }) => background};
`;

export const ThanksToYou = styled.p`
  ${defaultBodySmRegular}

  margin-block: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const ImpactAmount = styled.h4<{ color: string }>`
  ${defaultBodyLgBold}

  color: ${({ color }) => color};
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 368px;
  }
`;

export const ImpactDescription = styled.p<{
  color: string;
  hasButton: boolean;
}>`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme, hasButton }) =>
    hasButton ? theme.spacing(16) : theme.spacing(8)};

  color: ${({ color }) => color};
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(48)};
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(12)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-right: ${({ theme }) => theme.spacing(8)};
`;
