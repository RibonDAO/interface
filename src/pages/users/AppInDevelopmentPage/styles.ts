import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdSemibold,
  defaultBodySmRegular,
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

export const Wrapper = styled.div`
  width: 328px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const SurveyCard = styled.div`
  width: 328px;
  margin-top: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(20, 16, 16)};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const SurveyButton = styled.a`
  ${defaultBodyMdSemibold}

  width: 100%;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.brand.primary[300]};
  color: ${({ theme }) => theme.colors.brand.primary};
  cursor: pointer;
`;

export const SurveyDescription = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.neutral[700]};
`;
export const Image = styled.img``;

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
