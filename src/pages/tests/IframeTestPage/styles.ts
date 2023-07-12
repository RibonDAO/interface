import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: calc(100vh - 56px);

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: calc(100% + 520px);
    height: calc(100vh - 128px - 64px);
    margin-left: -260px;
    margin-right: -260px;
  }
`;
