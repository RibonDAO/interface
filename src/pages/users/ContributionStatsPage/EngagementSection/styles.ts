import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
`;

export const DataContainer = styled.div`
  flex: 0.5;
  
  &:first-child {
    margin-right: ${({ theme }) => theme.spacing(20)};
  }
`;

export const ContentContainer = styled.div`
  display: flex;
`;
