import styled from "styled-components";
import { getPrimary } from "styles/colors/utils";

export const Container = styled.div`
  min-width: 240px;
  min-height: 140px;
  padding: 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 8px 8px 20px -2px ${({ theme }) => theme.colors.defaultShadow};
  cursor: pointer;
`;

export const Image = styled.img`
  height: 130px;
  margin-bottom: 8px;
  border-radius: 200px;
  object-fit: cover;
`;

export const Title = styled.h3`
  margin: 0;
`;

export const Subtitle = styled.h5`
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;
