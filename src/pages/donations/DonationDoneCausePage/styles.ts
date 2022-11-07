import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultParagraphMedium,
  defaultSubtitleMedium,
} from "styles/typography/default";
import { stylizedHeadingLarge } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 4em;
  border-radius: 25px;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  transform: rotate(45deg);

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: 8em;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  align-self: center;
  object-fit: contain;
  transform: rotate(-45deg) scale(1.36);
`;

export const DonationValue = styled.h1`
  ${stylizedHeadingLarge}
  color: ${({ theme }) => theme.colors.orange20};
`;

export const PostDonationText = styled.p`
  ${defaultParagraphMedium}
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CauseName = styled.span`
  ${defaultSubtitleMedium}
  color: ${({ theme }) => theme.colors.orange30};
`;

export const FinishButton = styled(Button)`
  max-width: 20.5em;
  margin-top: 3em;
  margin-bottom: 1em;
  display: block;
  justify-self: end;
`;
