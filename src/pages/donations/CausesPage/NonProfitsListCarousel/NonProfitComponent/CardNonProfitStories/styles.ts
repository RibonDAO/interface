import styled from "styled-components";

export const Container = styled.div`
  width: 296px;
  height: 432px;
  border-radius: 16px;
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
  padding: 48px 24px;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ul {
    margin-top: -12px;
    padding-left: 24px;
    line-height: 24px;
  }

  p {
    line-height: 24px;
  }
`;

export const ImageBackground = styled.div<{ imageUrl: string | undefined }>`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;
