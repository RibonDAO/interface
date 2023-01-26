import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

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
  ${stylizedDisplayLg}

  margin: 0;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const Subtitle = styled.h5`
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CardsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CardsContainer = styled.div`
  width: 100%;
  min-height: 216px;
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CardButton = styled(Button)`
  width: 135px;
  margin: 16px 0;
  border: 1px solid ${({ theme }) => theme.colors.green30};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.green30};
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
