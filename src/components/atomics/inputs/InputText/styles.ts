import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(8, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  border-radius: 8px;

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.neutral[500]};
  }
`;
