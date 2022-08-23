import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 472px;
  height: 100%;
  padding: 20px 14px 14px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.lightShadow};
`;
