import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  position: relative;
  z-index: 2;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const SliderContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(16)};
  flex: 2;
`;

export const Button = styled.button`
  width: ${({ theme }) => theme.spacing(40)};
  height: ${({ theme }) => theme.spacing(40)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.neutral10};
  cursor: pointer;
`;
