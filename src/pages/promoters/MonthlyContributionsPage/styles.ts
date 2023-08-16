import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(16)};
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(64)};
`;

export const BackArrowButton = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  cursor: pointer;
`;
