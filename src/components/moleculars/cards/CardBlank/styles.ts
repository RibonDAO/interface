import styled from "styled-components";

export const Container = styled.div`
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;
