import Button from "components/atomics/buttons/Button";
import styled, { css } from "styled-components";
import {
  defaultBodyLgBold,
  defaultBodyMdRegular,
  defaultBodySmRegular,
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

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
`;

export const DonationValue = styled.h1`
  ${stylizedDisplayLg}

  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const PostDonationText = styled.p`
  ${defaultBodySmRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const FinishButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ theme }) => theme.colors.brand.primary[800]};
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

export const ImpactDescription = styled.p`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme }) => theme.spacing(8)};

  color: ${({ theme }) => theme.colors.neutral[300]};
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

export const Image = styled.img``;
export type DiamondProps = {
  bg?: string;
};

export const DiamondBackground = css<{ bg?: string }>`
  width: 141%;
  height: 141%;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  background-image: ${({ bg }) => `url(${bg})`};
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%) rotate(45deg);
`;

export const Diamond = styled.div<DiamondProps>`
  width: 200px;
  height: 200px;
  border-radius: 10%;
  position: relative;
  z-index: ${({ theme }) => theme.zindex.above};
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutral[300]};
  transform: rotate(-45deg) scale(0.8);
  transform-origin: center;

  ::before {
    ${({ bg }) => bg && DiamondBackground}
  }

  * {
    transform: rotate(45deg);
  }
`;
