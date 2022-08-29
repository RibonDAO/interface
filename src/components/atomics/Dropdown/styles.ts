import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

export const Input = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.mediumGreen};
  border-radius: 5px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.darkGray};

  label {
    padding: 0 2px;
    position: relative;
    top: -9px;
    left: 10px;
    display: inline;
    font-size: 14px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mediumGreen};

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      top: -8px;
    }
  }

  input {
    width: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 5px;
    position: relative;
    top: -5px;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 16px;
    font-family: ${({ theme }) => theme.font.family};
    line-height: 20px;
    color: ${({ theme }) => theme.colors.darkGray};

    &:hover {
      cursor: pointer;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      top: -8px;
    }
  }

  img {
    height: 24px;
    position: absolute;
    top: 8px;
    right: 15px;
    align-self: center;
    justify-self: center;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const OptionContainer = styled.div`
  padding: 8px 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.xLightGray};
    cursor: pointer;
  }
`;

export const OptionText = styled.h4`
  font-weight: 700;
  line-height: 1.6;
`;
