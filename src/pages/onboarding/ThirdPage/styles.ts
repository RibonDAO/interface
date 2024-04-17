import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing(48, 16, 0)};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  align-self: flex-start;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
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

export const Description = styled.p`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.neutral10};
`;

export const ButtonComponent = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(32)};
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
