import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    padding: 16px;
    background-color: ${theme.colors.ribonWhite};
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    border-radius: 16px;
    margin-bottom: 16px;
  `}
`;

export const Image = styled.img`
  display: block;
  height: 56px;
  width: 56px;
  margin-right: 16px;
  object-fit: cover;
  border-radius: 50%;
`;

export const Text = styled.p`
  ${({ theme }) => css`
    margin-top: 16px;
    font-size: 14px;
    color: ${theme.colors.ribonBlack};
    font-weight: ${theme.font.normal};
    text-align: center;
  `}
`;
