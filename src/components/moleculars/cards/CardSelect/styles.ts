import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 472px;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(20, 16, 16)};
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.defaultShadow};
`;
