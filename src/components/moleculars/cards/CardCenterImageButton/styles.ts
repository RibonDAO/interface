import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.lightShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 286px;
    border-right: 1px solid white;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  object-fit: cover;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 267px;
    border-right: 1px solid white;
  }
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
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGray};

  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const Bullet = styled.h6`
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
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
