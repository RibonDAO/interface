import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

type CenterImageContainerProps = {
  backgroundImage: string;
};
export const CenterImageContainer = styled.div<CenterImageContainerProps>`
  ${({ backgroundImage }) => css`
    float: left;
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    border-radius: 50%;
    min-width: 256px;
    margin: 1.66%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${backgroundImage});
  `}
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: -46px;
  z-index: 0;
`;

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: 16px 12px;
  object-fit: contain;
`;
