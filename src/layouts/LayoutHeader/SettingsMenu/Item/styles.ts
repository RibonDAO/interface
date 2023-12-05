import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  :not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  }

  :hover {
    cursor: pointer;
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
`;

export const CustomIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
export const Text = styled.p`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
