import styled, { keyframes } from "styled-components";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  grid-gap: 0;
  align-items: center;
  justify-content: center;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid green;
  border-top-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ${spinAnimation} 0.6s linear infinite;
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin-top: ${({ theme }) => theme.spacing(8)};
  position: relative;
  z-index: 2;
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Description = styled.p`
  ${defaultBodyMdSemibold}

  max-width: 350px;
  margin-top: ${({ theme }) => theme.spacing(8)};
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Logo = styled.img`
  width: 120px;
  margin-bottom: ${({ theme }) => theme.spacing(32)};
`;

export const Image = styled.img`
  margin-block: ${({ theme }) => theme.spacing(16)};
  width: 120px;
`;

export const TopRightShape = styled.img`
  width: 50%;
  max-width: 500px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export const BottomLeftShape = styled.img`
  width: 50%;
  max-width: 500px;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;
