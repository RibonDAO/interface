import styled from "styled-components";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.div`
  width: 296px;
  height: 432px;
  border-radius: ${theme.spacing(16)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const MarkdownContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing(48, 24)};
  position: absolute;
  z-index: ${theme.zindex.above};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(12)};  

  ul {
    line-height: ${theme.spacing(24)};
    padding-left: ${theme.spacing(24)};
    margin-top: -${theme.spacing(12)};
  }

  p {
    line-height: ${theme.spacing(24)};
  }
`;

export const ImageBackground = styled.image`
  width: 100%;
  height: 100%;
  border-radius: ${theme.spacing(16)};
`;
