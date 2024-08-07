import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components";

export const Container = styled.div`
  z-index: ${theme.zindex.above};
  display: flex;
  flex-direction: row;
`;
export const LeftContainer = styled.div`
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LeftImageContainer = styled.div`
  width: 104px;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftImage = styled.img`
  width: 100%;
  height: 100%;
  border: 4px solid ${theme.colors.neutral10};
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarContainer = styled.div<{ bg: string }>`
  width: 100%;
  height: 100%;
  border: 4px solid ${theme.colors.neutral10};
  border-radius: 52px;
  background-color: ${theme.colors.neutral10};
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const RightContainer = styled.div`
  width: 128px;
  height: 128px;
  margin-left: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RightImage = styled.img`
  width: 128px;
  height: 128px;
`;
