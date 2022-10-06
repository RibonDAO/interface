import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 8px;

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray30};
  }
`;
