import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-right: ${({ theme }) => theme.spacing(112)};
    padding-left: ${({ theme }) => theme.spacing(112)};
  }
`;
