import Button from "components/atomics/buttons/Button";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 900;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.darkGray};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGray};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 16px;
  }
`;

export const CardsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-evenly;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  }
`;

export const CardButton = styled(Button)`
  width: 100px;
  margin: 16px 0;
  align-self: center;
`;

export const EmptySectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: calc(100% - 400px);
  }
`;
