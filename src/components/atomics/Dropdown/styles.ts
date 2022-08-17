import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const Input = styled.div`
  ${({ theme }) => css`
    height: 40px;
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.ribonBlue};
    position: relative;
    display: inline-block;
    border-radius: 5px;
    box-sizing: border-box;
    color: ${theme.colors.ribonBlack};

    label {
      padding: 0 2px;
      display: inline;
      position: relative;
      left: 10px;
      top: -9px;
      font-size: 14px;
      text-align: center;
      background-color: ${theme.colors.ribonWhite};
      color: ${theme.colors.ribonBlue};

      @media (min-width: ${theme.breakpoints.desktop}) {
        top: -8px;
      }
    }

    input {
      width: 100%;
      padding: 0 10px;
      border: none;
      position: relative;
      top: -5px;
      line-height: 20px;
      font-size: 16px;
      font-weight: bold;
      box-sizing: border-box;
      font-family: Lato;
      border-radius: 5px;
      color: ${theme.colors.ribonBlack};

      @media (min-width: ${theme.breakpoints.desktop}) {
        top: -8px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    img {
      position: absolute;
      height: 24px;
      right: 15px;
      top: 8px;
      align-self: center;
      justify-self: center;
    }

    &:hover {
      cursor: pointer;
    }
  `}
`;

export const OptionContainer = styled.div`
  ${({ theme }) => css`
    padding: 8px 16px;

    &:hover {
      background-color: ${theme.colors.hoverGray};
      cursor: pointer;
    }
  `}
`;

export const OptionText = styled.h4`
  font-weight: bold;
  line-height: 22px;
`;
