import styled from "styled-components";
import { defaultComponentTextLarge } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  border-radius: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 286px;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral10};
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  object-fit: cover;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 267px;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral10};
  }
`;

export const ExpandIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: ${({ theme }) => theme.zindex.above};
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
  object-fit: cover;
`;

export const DarkStroke = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    359.94deg,
    rgb(0, 0, 0) -8.98%,
    rgba(0, 0, 0, 9%) 57%
  );
`;

export const ImageDescription = styled.h4`
  ${defaultComponentTextLarge}
  padding: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const ContentSection = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};

  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const Bullet = styled.h6`
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-end;
`;

export const Icon = styled.img`
  margin-left: 4px;
`;
