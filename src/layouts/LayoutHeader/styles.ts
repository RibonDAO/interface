import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const ContainerRight = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;

export const Settings = styled.img`
  ${() => css`
    cursor: pointer;
  `}
`;

export const CounterImage = styled.img`
  ${() => css`
    width: 12.5px;
  `}
`;

export const CounterContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px;
    margin-right: 5px;
    background: ${theme.colors.ribonWhite};
    border: 1px solid ${theme.colors.lightGray};
    box-sizing: border-box;
    border-radius: 4px;
    margin-left: 8px;

    &:hover {
      cursor: pointer;
    }
  `}
`;

export const TicketsAmount = styled.p`
  ${({ color }) => css`
    font-size: 14px;
    line-height: 10px;
    font-weight: bold;
    margin-right: 2px;
    color: ${color};
  `}
`;
