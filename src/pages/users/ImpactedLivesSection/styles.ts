import styled from "styled-components";
import Background from "./assets/background.svg";

export const Container = styled.div`
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: 32px;
  min-height: 322px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.brand.primary[800]};
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 164px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: grid;
    grid-template-columns: 2fr 1fr 3fr;
    column-gap: ${({ theme }) => theme.spacing(16)};
  }
`;
