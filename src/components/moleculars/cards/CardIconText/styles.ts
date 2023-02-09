import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${({ theme }) => theme.spacing(12)};
  object-fit: contain;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const InsideContainer = styled.div`
  display: flex;
  align-items: center;
`;
