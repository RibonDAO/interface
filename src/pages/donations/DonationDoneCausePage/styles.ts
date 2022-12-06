import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultParagraphMedium,
  defaultSubtitleMedium,
} from "styles/typography/default";
import { stylizedHeadingLarge } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  transform: scale(1.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: 40px;
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
  ${stylizedHeadingLarge}

  color: ${({ color }) => color};
`;

export const PostDonationText = styled.p`
  ${defaultParagraphMedium}

  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CauseName = styled.span<{
  isGreen?: boolean;
}>`
  ${defaultSubtitleMedium}

  color: ${(props) =>
    props.isGreen
      ? ({ theme }) => theme.colors.green30
      : ({ theme }) => theme.colors.gray30};
`;

export const FinishButton = styled(Button)<{ background: string }>`
  max-width: 20.5em;
  margin-top: 3em;
  margin-bottom: 1em;
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ background }) => background};
`;
