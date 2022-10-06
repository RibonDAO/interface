import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 312px;
  height: 104px;
  padding: 15px 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutral10};
  cursor: pointer;

  &:hover {
    transition: transform 0.4s ease;
    transform: scale(1, 1.1);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: 24%;
  }
`;

export const CardSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #left-icon {
    margin-right: 2px;
    position: static;
  }
`;

export const RibonsAmountContainer = styled.div`
  width: 60%;
  border-radius: 20px;
  position: absolute;
  bottom: 4px;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h4`
  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Description = styled.h5`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const ImageSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 88px;
  height: auto;
`;

export const CounterContainer = styled.span`
  min-width: 16px;
  padding: 2px;
  border-radius: 100%;
  position: absolute;
  top: 8px;
  right: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.orange30};
  color: ${({ theme }) => theme.colors.neutral10};
`;
