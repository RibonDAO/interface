import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: flex-start;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const Text = styled.p`
  ${defaultBodyXsSemibold}

  width: 100%;
  position: absolute;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 20px;
  border-radius: 5px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.brand.primary[300]};
`;
