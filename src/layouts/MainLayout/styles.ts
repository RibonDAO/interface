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
  margin-bottom: 64px;
  padding: 24px 16px 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const Settings = styled.img`
  cursor: pointer;
`;
