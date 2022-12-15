import styled from "styled-components";
import { boldParagraphMedium } from "styles/typography/default";

export const Container = styled.div`
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(40, 36, 28, 0.25);

  cursor: pointer;

  &:first-child {
    margin-top: 16px;
  }
`;

export const ImageContainer = styled.img`
  width: 100%;
  width: 296px;
  height: 136px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;

export const CauseName = styled.span`
  ${boldParagraphMedium}

  position: absolute;
  z-index: 2;
  color: ${({ theme }) => theme.colors.orange40};
  transform: translate(30%, -100%);
`;

export const Intersection = styled.img`
  position: absolute;
  z-index: 1;
  transform: translate(0, -100%);
`;
