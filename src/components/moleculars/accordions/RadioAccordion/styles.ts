import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 8px;
  position: relative;
`;

export const RadioListItem = styled.div<{ last?: boolean }>`
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

export const RadioRow = styled.div`
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

export const RightIcon = styled.img`
  height: 28px;
`;

export const RadioContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
