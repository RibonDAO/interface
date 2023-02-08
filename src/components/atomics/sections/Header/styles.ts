import styled from "styled-components";

export const Container = styled.div`
  height: 56px;
  margin: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 128px;
    margin-left: ${({ theme }) => theme.spacing(0)};
  }
`;

export const Logo = styled.img`
  height: 34px;
  object-fit: contain;
`;

export const Divider = styled.span`
  margin: ${({ theme }) => theme.spacing(0, 8)};
  color: ${({ theme }) => theme.colors.neutral[200]};
`;

export const InsideContainer = styled.div`
  height: 56px;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 128px;
    margin-left: ${({ theme }) => theme.spacing(0)};
    justify-content: center;
  }
`;

export const BackButtonImage = styled.img`
  cursor: pointer;
`;
