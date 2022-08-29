import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RibonsAmount = styled.p`
  margin-right: 2px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const Sparkle = styled.img`
  width: 20px;
  height: 20px;
`;
