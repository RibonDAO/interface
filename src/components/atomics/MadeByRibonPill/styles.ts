import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const Pill = styled.div<{ backgroundColor: string }>`
  padding: ${({ theme }) => theme.spacing(8)}
    ${({ theme }) => theme.spacing(24)};
  border-radius: 100px;
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  transition: transform 0.2s;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const Text = styled.p`
  ${defaultBodySmMedium}
`;

export const Icon = styled.img`
  width: 64px;
  margin-top: 2px;
`;
