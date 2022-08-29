import styled from "styled-components";
import ReactModal from "react-modal";

export const BlankModal = styled(ReactModal)`
  width: 100%;
  max-width: 360px;
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
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

export const Circle = styled.div`
  border: 3px solid #d9e5eb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
`;
export const AnimationContent = styled.div``;

export const Icon = styled.img`
  width: 100%;
  padding: 20%;
`;

export const IconDescription = styled.p`
  padding-top: 4px;
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 12px;
  text-align: center;
  color: #82aabe;
`;

export const Text = styled.p`
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const ProgressBar = styled.div`
  margin-bottom: 13%;
  border: 2px solid #d9e5eb;
  border-radius: 16px;
`;

export const ProgressImg = styled.img`
  position: absolute;
  bottom: 51%;
  animation: go 3s linear;

  @keyframes go {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(250%);
    }
  }
`;
