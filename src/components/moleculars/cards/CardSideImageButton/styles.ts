import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.ribonWhite};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 16px;
    border: 1px solid ${theme.colors.ribonWhite};
    box-sizing: border-box;
    border-radius: 16px;
    width: 100%;
    max-width: 312px;
    height: 104px;
    cursor: pointer;

    &:hover {
      transition: transform 0.4s ease;
      transform: scale(1, 1.1);
    }

    @media (min-width: ${theme.breakpoints.pad}) {
      margin-bottom: 24%;
    }
  `}
`;

export const CardSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-left: 4px;

  #left-icon {
    position: static;
    margin-right: 2px;
  }
`;

export const RibonsAmountContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.ribonWhite};
    width: 60%;
    border-radius: 20px;
    position: absolute;
    bottom: 4px;
  `}
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    font-weight: bold;
    text-align: center;
    line-height: 1.4;
    font-size: 16px;
    margin-bottom: 4px;
    color: ${theme.colors.ribonBlack};
  `}
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Description = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    text-align: center;
    line-height: 160%;
  `}
`;

export const ImageSection = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 88px;
  height: auto;
`;

export const CounterContainer = styled.span`
  ${({ theme }) => css`
    text-align: center;
    min-width: 16px;
    color: ${theme.colors.ribonWhite};
    position: absolute;
    background-color: ${theme.colors.phcYellow2};
    right: 0px;
    top: 8px;
    border-radius: 100%;
    padding: 2px;
  `}
`;
