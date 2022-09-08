import styled from "styled-components";

export const Container = styled.div`
  height: 56px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 128px;
    margin-left: 0;
  }
`;

export const Logo = styled.img`
  height: 34px;
  object-fit: contain;
`;

export const Divider = styled.span`
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const InsideContainer = styled.div`
  height: 56px;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 128px;
    margin-left: 0;
    justify-content: center;
  }
`;

export const BackButtonImage = styled.img`
  cursor: pointer;
`;
