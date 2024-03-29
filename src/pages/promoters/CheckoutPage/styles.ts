import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    max-width: 424px;
    padding: ${({ theme }) => theme.spacing(24)};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow10};
  }
`;

export const ImageContainer = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.spacing(24)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const LoaderShape = styled.div`
  margin-block: ${({ theme }) => theme.spacing(8)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }

    50% {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
    }

    100% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
  }
`;
