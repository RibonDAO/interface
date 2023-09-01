import styled from "styled-components";

export const MainContainer = styled.div<{ isFullSize?: boolean }>`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin: ${({ theme, isFullSize }) =>
      isFullSize ? theme.spacing(0) : "0 14%"};
    margin-left: ${({ theme, isFullSize }) =>
      isFullSize ? "80px" : "calc(14% + 80px)"};
    display: flex;
    flex-direction: column;
  }
`;

export const MainBodyContainer = styled.div<{ isFullSize?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing(64)};
  padding: ${({ theme, isFullSize }) =>
    isFullSize ? 0 : theme.spacing(24, 16, 16)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`;

export const Settings = styled.img`
  cursor: pointer;
`;
