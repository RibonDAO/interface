import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RibonsAmount = styled.p`
  ${defaultBodySmSemibold}

  margin-right: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.brand.primary[300]};
`;

export const Sparkle = styled.img`
  width: 20px;
  height: 20px;
`;
