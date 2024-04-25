import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
`;

export const LeftBackgroundImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
  }
`;

export const RightBackgroundImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};

  padding-bottom: ${({ theme }) => theme.spacing(80)};
  z-index: ${({ theme }) => theme.zindex.above};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin: ${({ theme }) => theme.spacing(8, 0)};
  align-self: flex-start;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin: ${({ theme }) => theme.spacing(8, 0)};
  }
`;

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-right: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  margin-left: ${({ theme }) => theme.spacing(16)};
  text-align: center;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(16)};
    position: fixed;
    bottom: 0;
    left: 0;
    display: block;
  }
`;
