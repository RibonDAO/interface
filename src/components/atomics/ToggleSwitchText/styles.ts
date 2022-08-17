import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.ribonBlue};
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  text-align: center;
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 472px;
  }
`;

export const Selected = styled.a`
  min-width: 50%;
  border-radius: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.6;
  background: ${({ theme }) => theme.colors.ribonBlue};
  color: ${({ theme }) => theme.colors.white};
`;

export const Unselected = styled(Selected)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.ribonBlue};
`;
