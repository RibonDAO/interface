import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 480px;
    max-height: 720px;
  }
`;

export const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
`;

export const ProfileDataWrapper = styled.div`
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: ${({ theme }) => theme.zindex.above};
  display: flex;
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
`;

export const ProfileInfo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Info = styled.p`
  font-weight: ${({ theme }) => theme.font.semibold};
`;

export const SmallInfo = styled.small``;

export const Icon = styled.img`
  margin-bottom: -2px;
  margin-left: 4px;
`;
