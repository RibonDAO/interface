import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LeftContainer = styled.div`
  width: 128px;
  height: 128px;
  justify-content: center;
  align-items: center;
`;
export const LeftImageContainer = styled.div`
  width: 104px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 52px;
  border: 4px solid ${theme.colors.neutral10};
`;

export const AvatarContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 52px;
  border: 4px solid ${theme.colors.neutral10};
  background-color: ${theme.colors.neutral10};
`;
export const RightContainer = styled.div`
  width: 128px;
  height: 128px;
  margin-left: -40px;
  justify-content: center;
  align-items: center;
`;
export const RightImage = styled.img`
  width: 128px;
  height: 128px;
`;
