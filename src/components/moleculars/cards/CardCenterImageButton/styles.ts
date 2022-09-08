import styled from "styled-components";

export const Container = styled.div`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.lightShadow};
`;

export const Image = styled.img`
  width: 100%;
  height: 194px;
  border-radius: 16px;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const ContainerText = styled.div`
  width: 100%;
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h3`
  margin-bottom: 8px;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.darkGray};
`;
