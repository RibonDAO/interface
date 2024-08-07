import styled from "styled-components";
import {
  defaultBodyLgMedium,
  defaultHeadingXs,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";
import ShapeSm from "./assets/shape-sm.svg";
import Shape from "./assets/shape.svg";

export const Container = styled.div`
  max-width: 960px;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(32)};
  border-radius: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing(64)};
  align-items: center;
  justify-content: flex-start;
  background-color: #c7e6f9;
  background-image: url(${ShapeSm});
  background-position: top center;
  background-size: contain;
  background-repeat: no-repeat;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    background-image: url(${Shape});
    background-position: right;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 150px;
  height: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
  }
`;

export const Title = styled.h2`
  ${defaultHeadingXs}

  margin-inline: auto;
  color: #235174;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-inline: 0;
    text-align: left;
  }
`;

export const Text = styled.h5`
  ${defaultBodyLgMedium}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: #235174;
`;

export const CtaButton = styled(Button)<{ copied: boolean }>`
  width: 100% !important;
  border: none;
  background-color: ${({ copied, theme }) =>
    copied ? theme.colors.brand.primary[700] : "#235174"};
  color: ${({ theme }) => theme.colors.neutral10};
`;
