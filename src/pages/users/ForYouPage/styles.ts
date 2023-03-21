import styled from "styled-components";

export const Container = styled.div``;

export const TopImageBackground = styled.img`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
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
  width: 25%;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
  }
`;
