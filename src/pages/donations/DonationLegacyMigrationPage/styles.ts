import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodySmRegular,
  defaultHeadingXxs,
} from "styles/typography/default";
import { stylizedDisplayXs, stylizedDisplayMd, stylizedDisplaySm } from "styles/typography/stylized";
import YellowShape from "assets/images/yellow-shape.svg";
import PinkShape from "assets/images/pink-shape.svg";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(112)} 16px 16px 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    justify-content: center;
  }
`;

export const PinkBackground = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const GreenBackground = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 448px;
  }
`;

export const SquaredIcon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${YellowShape}), url(${PinkShape});
  background-color: ${({ theme }) => theme.colors.neutral10};
  background-position: bottom right, top left;
  background-size: 50%;
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.defaultShadow};
`;

export const InnerIcon = styled.img`
  width: 48px;
  height: 48px;
`;


export const IconsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(48)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Equals = styled.h1`
  ${defaultHeadingXxs}
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin: 0 16px;
  text-align: center;
`;

export const Icon = styled.img`
  width: 148px;
  height: 92px;
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}

  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[900]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayMd}
  }
`;

export const Description = styled.p`
  ${defaultBodySmRegular};

  margin-top: ${({ theme }) => theme.spacing(12)};
  padding: 0 ${({ theme }) => theme.spacing(20)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const BoldDescription = styled.span`
  ${defaultBodySmRegular};

  font-weight: 700;
`;

export const FinishButton = styled(Button)`
  align-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 448px;
    margin-top: ${({ theme }) => theme.spacing(48)};
  }
`;
