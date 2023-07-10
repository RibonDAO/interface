import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";

export const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  position: relative;
  background-color: white;
`;

export const Title = styled.h5`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};
  ${defaultBodyMdMedium}
`;

export const IframeContainer = styled.div`
  width: 100%;
  min-height: 263px;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
  }
`;
