import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(8, 0)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type DividerProps = {
  width?: string;
};
export const Divider = styled.div<DividerProps>`
  width: ${({ width }) => width};
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ color }) => color};

  &::before,
  &::after {
    border-bottom: 2px solid ${({ color }) => color};
    content: "";
    flex: 1;
  }

  &:not(:empty)::before {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }

  &:not(:empty)::after {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
`;
