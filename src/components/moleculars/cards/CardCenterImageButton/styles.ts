import { rgba } from "lib/hexToRgba";
import styled from "styled-components";
import { defaultBodyMdSemibold } from "styles/typography/default";

export const Container = styled.div<{ fullWidth: boolean }>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  border-radius: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "286px")};
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

export const InfoText = styled.div`
  padding-block: ${({ theme }) => theme.spacing(4)};
  padding-inline: ${({ theme }) => theme.spacing(8)};
  min-width: 100px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: ${({ theme }) => theme.zindex.above};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.neutral[800], 0.7)};
  color: ${({ theme }) => theme.colors.neutral10};
  cursor: pointer;

  img {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
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
  ${defaultBodyMdSemibold}

  padding: ${({ theme }) => theme.spacing(16)};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.above};
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const ContentSection = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
`;

export const Bullet = styled.h6`
  margin-left: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-end;
`;

export const Icon = styled.img`
  margin-left: ${({ theme }) => theme.spacing(4)};
`;
