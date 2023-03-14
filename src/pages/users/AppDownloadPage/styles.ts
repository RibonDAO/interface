import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

export const Title = styled.p`
  ${stylizedDisplayMd}

  margin-top: ${({ theme }) => theme.spacing(20)};
  margin-bottom: ${({ theme }) => theme.spacing(24)};
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

export const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[900]};
  border-radius: 8px;
  background-color: ${({ theme, copy }) =>
    copy ? theme.colors.brand.primary[900] : theme.colors.neutral10};
  color: ${({ theme, copy }) =>
    copy ? theme.colors.neutral10 : theme.colors.brand.primary[900]};
`;

export const ImagesContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DescriptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QRCode = styled.img`
  width: 120px;
  height: 120px;
`;

export const InputLink = styled.input`
  height: 48px;
  margin-right: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(12)};
  border: 1px solid #bfbcb5;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const Badges = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BorderContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(40)};
  padding-left: ${({ theme }) => theme.spacing(40)};
  border-left: 1px solid #bfbcb5;
`;

export const LinkContainer = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(8, 0, 40)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 16, 16)};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.navbar};
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
    position: relative;
    background-color: transparent;
  }
`;

export const Image = styled.img``;

export const Link = styled.a``;

export const LeftImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
  }
`;
export const RightImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    right: 0;
    display: block;
  }
`;

export const LeftArrow = styled.img`
  width: 24px;
  height: 24px;
  margin: ${({ theme }) => theme.spacing(16)};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(64)};
  }
`;

export const DownloadButton = styled.a`
  ${defaultBodyMdSemibold}

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.brand.primary[300]};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  cursor: pointer;

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.primary[300]};
    color: ${({ theme }) => theme.colors.brand.primary[900]};
  }

  &:visited {
    background-color: ${({ theme }) => theme.colors.brand.primary[300]};
    color: ${({ theme }) => theme.colors.brand.primary[900]};
  }
`;
