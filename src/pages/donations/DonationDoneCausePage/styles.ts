import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
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
  max-width: 20.5em;
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ background }) => background};
`;
