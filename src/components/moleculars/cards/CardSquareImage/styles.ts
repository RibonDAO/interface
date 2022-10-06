import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 8px 8px 20px -2px ${({ theme }) => theme.colors.defaultShadow};
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
`;
