import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(40)};
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(32)};
  align-items: flex-end;
  justify-content: center;
`;
