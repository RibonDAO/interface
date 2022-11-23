import styled from "styled-components";

export const RoundButton = styled.button<{ color: string }>`
  width: 40px;
  height: 40px;
  border: solid 2px ${({ color }) => color};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.neutral10};
`;
