import styled from "styled-components";

export const Container = styled.form`
  padding-inline: ${({ theme }) => theme.spacing(16)};
`;

export const Half = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;
