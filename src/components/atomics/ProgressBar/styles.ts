import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: flex-start;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.neutral[25]};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.13);
`;

export const Text = styled.p`
  ${defaultBodyXsSemibold}

  width: 100%;
  position: absolute;
  line-height: 18px;
  text-align: center;
  color: ${({ color }) => color};
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 16px;
  border-radius: 5px;
  position: absolute;
  background-color: ${({ color }) => color};
  transition: width 1.5s ease-in-out;
`;
