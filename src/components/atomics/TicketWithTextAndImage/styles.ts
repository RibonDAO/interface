import styled from "styled-components";
import {
  defaultParagraphSmall,
  defaultSubtitleSmall,
} from "styles/typography/default";

export const Container = styled.div`
  min-height: 64px;
  margin-bottom: 12px;
  position: relative;
  display: flex;
  box-shadow: 20px 20px 40px 20px rgba(24, 86, 105, 10%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
  }

  &::before {
    height: 18px;
    top: 0;
    right: 0;
    left: 0;
  }

  &::after {
    height: 18px;
    border-radius: 40%;
    top: 35%;
    right: -3%;
    left: 95%;
    background: linear-gradient(
      90deg,
      rgba(24, 86, 105, 25%) 0%,
      rgba(130, 170, 190, 45%) 55%,
      rgba(130, 170, 190, 25%) 65%,
      rgba(130, 170, 190, 0%) 80%,
      rgba(130, 170, 190, 0%) 90%
    );
    box-shadow: 0 20px 40px rgba(24, 86, 105, 15%);
  }
`;

export const LeftContainer = styled.div`
  width: 70%;
  padding: 16px;
  border-right: 1px dashed rgba(130, 170, 190, 60%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform-origin: top left;
`;

export const Title = styled.h3`
  ${defaultSubtitleSmall}
`;

export const Subtitle = styled.p`
  ${defaultParagraphSmall}
  color: ${({ theme }) => theme.colors.green30};
`;

export const RightContainer = styled.div`
  width: 30%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 57px;
  height: 57px;
  margin-right: 18px;
  margin-left: 4px;
  object-fit: contain;
`;
