import styled from "styled-components";

export const Container = styled.div`
  width: 296px;
  height: 432px;
  border-radius: ${({ theme }) => theme.spacing(16)};
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
  padding: ${({ theme }) => theme.spacing(48, 24)};
  position: absolute;
  z-index: ${({ theme }) => theme.zindex.above};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(12)};

  ul {
    margin-top: -12px;
    padding-left: ${({ theme }) => theme.spacing(24)};
    line-height: ${({ theme }) => theme.spacing(24)};
  }

  p {
    line-height: ${({ theme }) => theme.spacing(24)};
  }
`;

export const ImageBackground = styled.image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.spacing(16)};
`;
