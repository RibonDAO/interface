import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 82px;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gray40};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray30};
`;

export const LeftContainer = styled.div`
  width: 67%;
`;

export const RightContainer = styled.div`
  width: 33%;
`;
