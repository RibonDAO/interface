import { AuxiliarButtonText } from "components/atomics/typography/AuxiliarButtonText/styles";
import styled from "styled-components";

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div``;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Settings = styled.img`
  cursor: pointer;
`;

export const CounterImage = styled.img`
  width: 12.5px;
`;

export const CounterContainer = styled.div`
  margin-right: 5px;
  margin-left: 8px;
  padding: 7px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`;

export const TicketsAmount = styled(AuxiliarButtonText)`
  margin-right: 2px;
  color: ${({ color }) => color};
`;
