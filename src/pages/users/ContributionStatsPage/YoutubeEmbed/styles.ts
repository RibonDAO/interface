import styled from "styled-components";


export const Container = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  background-color: white;
`;

export const Title = styled.h5`
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const IframeContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 263px;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    outline: none;
  }
`;