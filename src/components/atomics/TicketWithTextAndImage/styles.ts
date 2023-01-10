import styled from "styled-components";
import {
  defaultParagraphSmall,
  defaultSubtitleSmall,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  min-height: 64px;
  margin-bottom: 12px;
  border-radius: 2px;
  position: relative;
  display: flex;
  box-shadow: 20px 20px 40px 20px rgba(24, 86, 105, 10%);

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    height: 18px;
    top: 0;
    right: 0;
    left: 0;
  }

  &::after {
    width: 4%;
    height: 20%;
    border-radius: 50% 0 0 50%;
    position: absolute;
    top: 50%;
    right: -2%;
    background: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 3px 0 0 #d9d9d9;
    transform: translate(-50%, -50%);
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

export const Link = styled.a`
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
