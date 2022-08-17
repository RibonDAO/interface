import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  width: 310px;
  height: 180px;
  margin: 20px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 350px;
    height: 200px;
  }
`;

export const LeftImage = styled.img`
  width: 180px;
  height: 180px;
  border: solid 5px ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  position: absolute;
  left: 0;
  object-fit: cover;
  filter: drop-shadow(0 20px 40px ${({ theme }) => theme.colors.lightShadow});

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 200px;
    height: 200px;
  }
`;

export const RightImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  z-index: 1;
  object-fit: cover;
  filter: drop-shadow(0 20px 40px ${({ theme }) => theme.colors.lightShadow});

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 200px;
    height: 200px;
  }
`;
