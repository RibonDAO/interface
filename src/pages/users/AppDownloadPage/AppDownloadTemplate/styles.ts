import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

export const Title = styled.p`
  ${stylizedDisplayMd}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdBold}

  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  grid-gap: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 960px;
  }
`;

export const Wrapper = styled.div<{
  hasMenu?: boolean;
  hasMarginTop?: boolean;
}>`
  width: ${({ hasMenu }) => (hasMenu ? "100%" : "320px")};
  margin: ${({ hasMenu }) => hasMenu === false && "0 auto"};
  margin-top: ${({ hasMenu }) => hasMenu && "30%"};
  margin-top: ${({ hasMarginTop, theme }) => hasMarginTop && theme.spacing(64)};
  margin-top: ${({ hasMenu, hasMarginTop }) =>
    hasMenu === false && hasMarginTop === false && "5%"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 320px;
    margin: ${({ hasMenu }) => hasMenu && "15% auto 0 auto"};
    margin-top: ${({ hasMarginTop }) => hasMarginTop && "56px"};
  }
`;

export const FilledButton = styled.button`
  ${defaultBodyMdSemibold}

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.brand.primary[300]};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Button = styled.button<{ copy?: boolean }>`
  ${defaultBodyMdSemibold}

  width: 100%;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: ${({ theme, copy }) =>
    copy ? "none" : `1px solid ${theme.colors.brand.primary[600]}`};
  border-radius: 8px;
  background-color: ${({ theme, copy }) =>
    copy ? theme.colors.brand.primary[900] : theme.colors.neutral10};
  color: ${({ theme, copy }) =>
    copy ? theme.colors.neutral10 : theme.colors.brand.primary[900]};
`;

export const Badges = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
`;

export const DescriptionBadge = styled(Description)`
  margin-left: ${({ theme }) => theme.spacing(40)};
`;

export const QRCode = styled.img`
  width: 120px;
  height: 120px;
  margin-top: ${({ theme }) => theme.spacing(12)};
`;

export const InputLink = styled.input`
  height: 48px;
  margin-right: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(12)};
  border: 1px solid #bfbcb5;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :first-child {
    margin-right: ${({ theme }) => theme.spacing(40)};
  }
`;

export const BorderContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(32)};
  border-left: 1px solid #bfbcb5;
`;

export const LinkContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(8, 0, 40)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div<{
  hasMenu?: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 16, 16)};
  position: fixed;
  bottom: ${({ hasMenu }) => (hasMenu === false ? "0" : "10%")};
  left: 0;
  z-index: ${({ theme, hasMenu }) => hasMenu === false && theme.zindex.navbar};
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
    position: relative;
    background-color: transparent;
  }
`;

export const Image = styled.img``;

export const ImageBadge = styled.img`
  padding-left: ${({ theme }) => theme.spacing(40)};
`;

export const Link = styled.a``;

export const DownloadButton = styled.a<{
  textColor?: string;
  backgroundColor?: string;
  hasAnotherButton?: boolean;
}>`
  ${defaultBodyMdSemibold}

  width: 100%;
  margin-bottom: ${({ theme, hasAnotherButton }) =>
    hasAnotherButton ? theme.spacing(16) : theme.spacing(32)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.brand.primary[300]};
  color: ${({ theme, textColor }) =>
    textColor || theme.colors.brand.primary[900]};
  cursor: pointer;

  &:active {
    background-color: ${({ theme, backgroundColor }) =>
      backgroundColor || theme.colors.brand.primary[300]};
    color: ${({ theme, textColor }) =>
      textColor || theme.colors.brand.primary[900]};
  }

  &:visited {
    background-color: ${({ theme, backgroundColor }) =>
      backgroundColor || theme.colors.brand.primary[300]};
    color: ${({ theme, textColor }) =>
      textColor || theme.colors.brand.primary[900]};
  }
`;
