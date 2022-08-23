import styled from "styled-components";

export const Container = styled.div`
  max-width: 206px;
  height: 123px;
  margin: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;

export const FirstText = styled.p`
  font-style: italic;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const MainContent = styled.p<{
  processing?: boolean;
}>`
  font-weight: 900;
  font-size: 24px;
  color: ${(props) =>
    props.processing
      ? props.theme.colors.darkGray
      : props.theme.colors.ribonBlue};
`;

export const RightMainContent = styled.span<{
  processing?: boolean;
}>`
  font-weight: 400;
  font-size: 14px;
  color: ${(props) =>
    props.processing
      ? props.theme.colors.darkGray
      : props.theme.colors.ribonBlue};
`;

export const LinkSection = styled.a`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
`;

export const SpinnerSection = styled.a`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  font-size: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ribonBlue};
`;

export const Image = styled.img``;
