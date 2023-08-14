import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.spacing(8)};
  position: relative;
`;

export const Title = styled.p`
  margin-left: ${({ theme }) => theme.spacing(8)};
`;

export const LinkListItem = styled.div<{ last?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-bottom: ${({ last, theme }) =>
    last ? "none" : `solid 1px ${theme.colors.neutral[100]}`};
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const Thumb = styled.div<{ selected?: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: ${({ selected, theme }) =>
    selected
      ? `solid 6px ${theme.colors.brand.primary[600]}`
      : `solid 2px ${theme.colors.neutral[600]}`};
  border-radius: 50%;
  position: relative;
`;

export const LinkRow = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftIcon = styled.img`
  height: 28px;
  margin-left: 0px;
  padding-right: ${({ theme }) => theme.spacing(8)};
`;

export const RightElement = styled.span``;

export const RightIcon = styled.img`
  height: 28px;
`;

export const LinkContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const RadioContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
