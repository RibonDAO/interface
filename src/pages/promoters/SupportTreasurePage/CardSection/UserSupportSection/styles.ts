import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import cardBackground from "assets/images/card-background.svg";

export const Container = styled.div`
  max-width: 472px;
  padding: ${({ theme }) => theme.spacing(20, 16, 16)};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.brand.secondary[300]};
  background-image: url(${cardBackground});
  background-size: cover;
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.colors.defaultShadow};
`;
export const SupportButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Description = styled.h5`
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
`;

export const IconText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  margin-right: ${({ theme }) => theme.spacing(8)};
`;
