import styled from "styled-components";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.div`
  height: 432px;
  width: 296px;
  border-radius: ${theme.spacing(16)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export const MarkdownContainer = styled.div`
  padding: ${theme.spacing(48, 24)};
  width: 100%;
  position: absolute;
  z-index: ${theme.zindex.above};
`;

export const ImageBackground = styled.image`
  width: 100%;
  height: 100%;
  border-radius: ${theme.spacing(16)};
`;
