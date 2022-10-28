import styled from "styled-components";
import ReactModal from "react-modal";

export const BlankModal = styled(ReactModal)`
  width: 100%;
  max-width: 360px;
  margin: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const Modal = styled(BlankModal)`
  button,
  a {
    margin-bottom: 8px;

    &:last-child {
      margin: 0;
    }
  }
`;
