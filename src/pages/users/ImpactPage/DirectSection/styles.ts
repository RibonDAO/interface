import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";

export const EmptySectionContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  align-self: center;
  text-align: center;
`;

export const EmptyImage = styled.img`
  max-width: 300px;
`;

export const EmptyTitle = styled.p`
  ${defaultBodyMdBold}
  width: 100%;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const EmptyText = styled.span`
  ${defaultBodyMdRegular}
  max-width: 392px;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const EmptyButton = styled(Button)`
  width: 196px;
  color: ${({ theme }) => theme.colors.green40};
`;
