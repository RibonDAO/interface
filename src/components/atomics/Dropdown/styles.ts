import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Input = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(0, 12)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.neutral[800]};

  label {
    padding: ${({ theme }) => theme.spacing(0, 4)};
    position: absolute;
    top: -15px;
    left: 10px;
    display: inline;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.neutral10};
    color: ${({ theme }) => theme.colors.brand.primary[300]};
  }

  input {
    ${defaultBodySmSemibold}

    width: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    line-height: 20px;
    background: transparent;
    color: ${({ theme }) => theme.colors.neutral[800]};

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
  padding: ${({ theme }) => theme.spacing(8, 16)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    cursor: pointer;
  }
`;

export const OptionText = styled.p``;
