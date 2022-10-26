import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AvailableValues = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export type AvailableValueProps = {
  isAfterThumb: boolean;
};

export const AvailableValue = styled.span<AvailableValueProps>`
  color: ${({ theme, isAfterThumb }) =>
    isAfterThumb ? theme.colors.green30 : theme.colors.gray30};
  margin-top: 12px;
`;
