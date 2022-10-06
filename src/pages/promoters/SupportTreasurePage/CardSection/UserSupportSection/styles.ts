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
  background-color: ${({ theme }) => theme.colors.mediumOrange};
  background-image: url(${cardBackground});
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.lightShadow};
`;

export const SupportButton = styled(Button)`
  color: ${({ theme }) => theme.colors.orange};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.h5`
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 12px;
`;

export const IconText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  margin-right: 8px;
`;
