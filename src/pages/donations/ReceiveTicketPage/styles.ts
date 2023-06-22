import { stylizedDisplayXs } from "styles/typography/stylized";
import styled, { css } from "styled-components";
import ReactModal from "react-modal";
import {
  defaultBodyMdBold,
  defaultBodyXsMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdSemibold}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  text-align: center;
`;

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

export const FilledButton = styled.button`
  ${defaultBodyMdSemibold}

  width: 100%;
  max-width: 328px;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
`;

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
    top: 0;
    right: 0;
    display: block;
  }
`;

export const TopImage = styled.img`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: none;
  }
`;

export const Image = styled.img``;

export const DiamondBackground = css<{ bg?: string }>`
  width: 141%;
  height: 141%;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  background-image: ${({ bg }) => `url(${bg})`};
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%) rotate(45deg);
`;

export const StripedBackground = css`
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral[50]} 35.71%,
    transparent 35.71%,
    transparent 50%,
    ${({ theme }) => theme.colors.neutral[50]} 50%,
    ${({ theme }) => theme.colors.neutral[50]} 85.71%,
    transparent 85.71%,
    transparent 100%
  );
  background-size: 28px 28px;
`;

export const BlankModal = styled(ReactModal)`
  padding-inline: 24px;
  width: 100%;
  max-width: 360px;
  margin: ${({ theme }) => theme.spacing(16)};
  padding-top: ${({ theme }) => theme.spacing(24)};
  padding-bottom: ${({ theme }) => theme.spacing(16)};
  border-radius: 8px;
  background-color: #fff;
`;

export const Modal = styled(BlankModal)`
  button,
  a {
    margin-bottom: ${({ theme }) => theme.spacing(8)};

    &:last-child {
      margin: ${({ theme }) => theme.spacing(0)};
    }
  }
`;

export type DiamondProps = {
  bg?: string;
  mainColor: string;
};

export const Diamond = styled.div<DiamondProps>`
  width: 86px;
  height: 86px;
  border-radius: 10%;
  position: relative;
  z-index: ${({ theme }) => theme.zindex.above};
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ mainColor }) => mainColor};
  transform: rotate(-45deg) scale(0.8);
  transform-origin: center;

  ::before {
    ${({ bg }) => bg && DiamondBackground}
  }

  * {
    transform: rotate(45deg);
  }
`;

export const AnimationContainer = styled.div`
  display: grid;
  grid-template-columns: 13fr 22fr 13fr;
  align-items: center;
`;

export const AnimationContent = styled.div``;

export const Icon = styled.img`
  width: 100%;
  padding: 20%;
`;

export const IconDescription = styled.p`
  ${defaultBodyXsMedium}

  padding-top: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Text = styled.p<{ color: string }>`
  ${defaultBodyMdBold}

  margin-bottom: ${({ theme }) => theme.spacing(32)};
  position: absolute;

  bottom: 0;
  text-align: center;

  color: ${({ color }) => color};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 40px;
  margin-top: -32px;
  display: flex;
  align-items: center;

  ::after {
    ${StripedBackground}

    width: 150px;
    height: 4px;
    content: "";
    position: absolute;
  }
`;

export type ProgressImgProps = {
  loaded: boolean;
};

export const ProgressImg = styled.img<ProgressImgProps>`
  width: 40px;
  z-index: ${({ theme }) => theme.zindex.above};
  animation: ${({ loaded }) => (loaded ? "go 3s linear" : "none")};

  @keyframes go {
    from {
      transform: translateX(0);

      --webkit-transform: translateX(0);
    }

    to {
      transform: translateX(250%);

      --webkit-transform: translateX(250%);
    }
  }
`;
