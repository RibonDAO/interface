import styled from "styled-components";
import { BoldLink } from "components/atomics/typography/Links/styles";

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  text-align: center;
  background: ${({ theme }) => theme.colors.neutral10};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 472px;
  }
`;

export const Selected = styled(BoldLink)`
  min-width: 50%;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.green30};
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Unselected = styled(Selected)`
  background: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.green30};
`;
