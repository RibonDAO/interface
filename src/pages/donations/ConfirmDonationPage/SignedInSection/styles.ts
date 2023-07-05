import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdSemibold } from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";

export const Container = styled.div`
  padding: ${theme.spacing(0, 16)};
`;

export const ImageContainer = styled.div`
  margin-top: ${theme.spacing(24)};
  padding: ${theme.spacing(48, 64, 48, 64)};
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  margin-top: ${theme.spacing(24)};
  align-items: center;
`;

export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MainImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Title = styled.h1`
  ${stylizedDisplayXs};
  color: ${theme.colors.brand.primary[900]};
  margin-bottom: ${theme.spacing(8)};
`;

export const Description = styled.p`
  ${defaultBodyMdSemibold};
  color: ${theme.colors.neutral[500]};
  margin-bottom: ${theme.spacing(24)};
`;

export const Button = styled(ButtonComponent)`
  height: 48px;
`;

export const BackgroundShapes = styled.img``;
