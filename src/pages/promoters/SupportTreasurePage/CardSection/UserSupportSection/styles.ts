import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import cardBackground from "assets/images/card-background.svg";

export const Container = styled.div`
  max-width: 472px;
  padding: 20px 14px 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-size: cover;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.orange20};
  background-image: url(${cardBackground});

  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.defaultShadow};
`;
export const SupportButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.orange40};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Description = styled.h5`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.orange40};
`;

export const IconText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  margin-right: 8px;
`;
