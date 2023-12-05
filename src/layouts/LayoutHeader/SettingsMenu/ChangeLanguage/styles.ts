import styled from "styled-components";

export const Container = styled.div`
  :not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  }
`;
