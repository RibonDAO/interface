import styled from "styled-components";
import { stylizedHeadingLarge } from "styles/typography/stylized";
import {
  defaultParagraphLarge,
  defaultSubtitleLarge,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const MainContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 472px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const Container = styled.div``;

export const DonationValueText = styled.h1`
  ${stylizedHeadingLarge};
  text-align: center;
  color: ${({ theme }) => theme.colors.orange20};
`;

export const Title = styled.h1`
  ${defaultParagraphLarge};
  text-align: center;
`;

export const TitleHighlight = styled.span`
  ${defaultSubtitleLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange30};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 64px;
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const DonateButton = styled(Button)`
  margin-top: 64px;
`;
