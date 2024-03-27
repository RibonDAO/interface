import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdRegular,
  defaultHeadingXl,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}

  margin-bottom: ${({ theme }) => theme.spacing(16)};

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const LeftImageContainer = styled.img`
  position: relative;
  top: 208px;
  left: 24px;
  z-index: 1;
  float: left;
`;
export const RightImageContainer = styled.img`
  position: relative;
  top: 72px;
  right: 24px;
  z-index: 1;
  float: right;
`;

export const DefaultImage = styled.img`
  margin-inline: auto;
  max-width: 300px;
`;

export const ContentContainer = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 400px;
  }
`;

export const InstructionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 700px;
  }
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: ${({ theme }) => theme.spacing(40)};
  left: ${({ theme }) => theme.spacing(16)};

  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    left: 168px;
  }
`;

export const Divider = styled.div`
  width: 180px;
  height: 2px;
  margin-top: ${({ theme }) => theme.spacing(24)};
  align-self: center;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
`;

export const Instruction = styled.div`
  width: 300px;
  min-width: 300px;
  padding: ${({ theme }) => theme.spacing(24)};
  border-radius: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
`;

export const Emoji = styled.p`
  ${defaultHeadingXl}

  text-shadow: 3px 2px 4px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const InstructionsTitle = styled.p`
  ${stylizedDisplayXs}

  padding-inline: ${({ theme }) => theme.spacing(16)};
  margin-top: ${({ theme }) => theme.spacing(20)};
  text-align: center;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const InstructionDescription = styled.p`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const InstructionsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(24)};
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: auto;
`;
