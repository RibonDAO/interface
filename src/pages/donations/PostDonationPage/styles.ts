import styled from "styled-components";
import {
  stylizedDisplayMd,
  stylizedDisplaySm,
} from "styles/typography/stylized";

import {
  defaultHeadingXs,
  defaultBodySmRegular,
} from "styles/typography/default";
import YellowShape from "assets/images/yellow-shape.svg";
import PinkShape from "assets/images/pink-shape.svg";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  padding-inline: 16px;
  width: 100%;
  height: 100vh;
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-block: 96px;
    max-width: 600px;
    margin: 0 auto;
    justify-content: center;
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

export const Card = styled.div<{ image?: string }>`
  margin-block: 8px;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background: black;
  background: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.defaultShadow};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 200px;
  }
`;

export const DarkOverlay = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.below};
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}

  margin-top: 24px;
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayMd}
  }
`;

export const Text = styled.p`
  ${defaultBodySmRegular}

  margin-block: 0;
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const CardMainText = styled.h2`
  ${defaultHeadingXs}

  margin-top: -4px;
  margin-bottom: 8px;
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const OutlineButton = styled(Button)`
  width: 100%;
  margin-top: 24px;
  border: solid 1px ${({ theme }) => theme.colors.green30};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.green30};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0px;
    position: relative;
    background-color: transparent;
  }
`;

export const BoostedDonation = styled.div`
  padding-inline: 8px;
  width: auto;
  height: 24px;
  border-radius: 4px;
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.orange10};
  color: ${({ theme }) => theme.colors.orange40};
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.defaultShadow};
`;

export const Rocket = styled.img`
  margin-inline-end: 4px;
  width: 16px;
  height: 16px;
`;

export const BottomContainer = styled.div``;
