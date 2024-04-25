import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  grid-gap: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 960px;
  }
`;

export const MainContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(64)};
  }
`;

export const LeftImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
  }
`;
export const RightImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    right: 0;
    display: block;
  }
`;

export const LeftArrow = styled.img`
  width: 24px;
  height: 24px;

  margin-right: ${({ theme }) => theme.spacing(16)};

  cursor: pointer;
`;
