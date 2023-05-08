import styled from "styled-components";

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  align-self: flex-start;
`;
