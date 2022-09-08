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
  margin-right: 10px;
  object-fit: cover;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const InsideContainer = styled.div`
  display: flex;
  align-items: center;
`;
