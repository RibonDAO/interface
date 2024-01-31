import styled from "styled-components";
import { defaultBodyMdBold } from "styles/typography/default";

export const CounterImage = styled.img`
  margin-right: ${({ theme }) => theme.spacing(4)};
`;

export const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.neutral10};

  &:hover {
    cursor: pointer;
  }
`;

export const TicketsAmount = styled.p`
  ${defaultBodyMdBold}
  margin-right: ${({ theme }) => theme.spacing(8)};
  color: ${({ color }) => color};
`;
