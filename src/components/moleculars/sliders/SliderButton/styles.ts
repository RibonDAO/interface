import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  position: relative;
  z-index: 2;
`;

export const SliderContainer = styled.div`
  flex: 2;
  padding: 0 ${({ theme }) => theme.spacing(16)};
`;

export const Button = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;
