import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  padding: ${({ theme }) => theme.spacing(40)}
    ${({ theme }) => theme.spacing(8)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.neutral[50]};

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: -16px;
    margin-left: -16px;
    border-radius: 0;
  }
`;
