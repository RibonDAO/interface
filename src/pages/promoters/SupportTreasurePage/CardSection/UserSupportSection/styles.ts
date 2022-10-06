import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import cardBackground from "assets/images/card-background.svg";

export const Container = styled.div`
  width: 100%;
  max-width: 472px;
  padding: 20px 14px 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.orange20};
  background-image: url(${cardBackground});
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.defaultShadow};
`;

export const SupportButton = styled(Button)`
  color: ${({ theme }) => theme.colors.orange40};
  background-color: ${({ theme }) => theme.colors.neutral10};
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Description = styled.h5`
  color: ${({ theme }) => theme.colors.orange40};
  margin-bottom: 12px;
`;

export const IconText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  margin-right: 8px;
`;
