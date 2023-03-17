import styled from "styled-components";

export const Container = styled.div``;

export const TopImageBackground = styled.img`
  left: 0;
  top: 0;
  position: fixed;
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: none;
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
    top: 0;
    display: block;
  }
`;
