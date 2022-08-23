import styled from "styled-components";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 900;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 36px;
  }
`;

export const CausesContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 8px;
  column-gap: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 70%;
    margin-top: 56px;
    row-gap: 16px;
    column-gap: 12px;
  }
`;

export const CausesCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.h5`
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ribonBlue};
  }
`;
