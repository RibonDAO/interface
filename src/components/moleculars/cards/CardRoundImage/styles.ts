import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type CenterImageContainerProps = {
  backgroundImage: string;
};
export const CenterImageContainer = styled.div<CenterImageContainerProps>`
  width: 100%;
  min-width: 256px;
  margin: 1.66%;
  padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
  border-radius: 50%;
  position: relative;
  float: left;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-top: -46px;
  border-radius: 50%;
  z-index: ${({ theme }) => theme.zindex.base};
  display: flex;
  justify-content: center;
`;

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  margin: ${({ theme }) => theme.spacing(16, 12)};
  border-radius: 50%;
  object-fit: contain;
`;
