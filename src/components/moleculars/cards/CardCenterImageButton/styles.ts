import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: 0 8px 24px ${theme.colors.lightShadow};
    width: 100%;

    @media (min-width: ${theme.breakpoints.pad}) {
      width: 286px;
      border-right: 1px solid white;
    }
  `}
`;

export const ImageSection = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-end;
    object-fit: cover;
    height: 200px;
    cursor: pointer;

    @media (min-width: ${theme.breakpoints.pad}) {
      height: 267px;
      border-right: 1px solid white;
    }
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
  object-fit: cover;
`;

export const DarkStroke = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    359.94deg,
    rgb(0, 0, 0) -8.98%,
    rgba(0, 0, 0, 9%) 57%
  );
`;

export const ImageDescription = styled.h4`
  padding: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  font-weight: ${({ theme }) => theme.font.semibold};
  line-height: 19px;
  color: white;
`;

export const ContentSection = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Info = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.mediumGray};
    text-align: center;

    &:not(:first-child) {
      margin-left: 4px;
    }
  `}
`;

export const Bullet = styled.h6`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    text-align: center;
    margin-left: 4px;
    align-items: center;
    justify-content: center;
    display: flex;
  `}
`;

export const InfoContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-end;
`;

export const Icon = styled.img`
  margin-left: 4px;
`;
