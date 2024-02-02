import styled from "styled-components";
import Icon from "components/atomics/Icon";

export const Settings = styled(Icon)`
  padding-left: ${({ theme }) => theme.spacing(8)};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  cursor: pointer;
`;
