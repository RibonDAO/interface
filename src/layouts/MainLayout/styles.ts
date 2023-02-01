import styled from "styled-components";

export const MainContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin: 0 14%;
    margin-left: calc(14% + 80px);
    display: flex;
    flex-direction: column;
  }
`;

export const MainBodyContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(64)};
  padding: ${({ theme }) => theme.spacing(24, 16, 16)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`;

export const Settings = styled.img`
  cursor: pointer;
`;
