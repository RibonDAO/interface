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
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 5px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.gray40};

  label {
    padding: 0 2px;
    position: relative;
    top: -9px;
    left: 10px;
    display: inline;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.neutral10};
    color: ${({ theme }) => theme.colors.green30};

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
    top: -12px;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.family};
    line-height: 20px;
    color: ${({ theme }) => theme.colors.gray40};

    &:hover {
      cursor: pointer;
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
    background-color: ${({ theme }) => theme.colors.gray10};
    cursor: pointer;
  }
`;

export const OptionText = styled.p``;
