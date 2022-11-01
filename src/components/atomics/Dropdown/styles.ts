import styled from "styled-components";
import { defaultComponentTextMedium } from "styles/typography/default";

export const Input = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 12px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.gray40};

  label {
    padding: 0 2px;
    position: absolute;
    top: -15px;
    left: 10px;
    display: inline;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.neutral10};
    color: ${({ theme }) => theme.colors.green30};
  }

  input {
    ${defaultComponentTextMedium};
    width: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    line-height: 20px;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray40};

    &:hover {
      cursor: pointer;
    }
  }

  img {
    width: 24px;
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    label {
      top: -15px;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

export const OptionContainer = styled.div`
  padding: 8px 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
    cursor: pointer;
  }
`;

export const OptionText = styled.p``;
