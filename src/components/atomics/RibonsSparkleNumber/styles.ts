import styled from "styled-components";
import { BoldP } from "../typography/BoldText/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RibonsAmount = styled(BoldP)`
  margin-right: 2px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const Sparkle = styled.img`
  width: 20px;
  height: 20px;
`;
