import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray40};
`;
