import styled from "styled-components";
import Icon from "components/atomics/Icon";

export const Settings = styled(Icon)`
  cursor: pointer;
  border-left: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding-left: ${({ theme }) => theme.spacing(8)};
`;
