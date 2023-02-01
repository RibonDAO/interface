import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;
