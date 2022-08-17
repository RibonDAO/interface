import styled, { css } from "styled-components";
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
  ${() => css`
    border: 3px solid #d9e5eb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `}
`;

export const AnimationContainer = styled.div`
  ${() => css`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
  `}
`;
export const AnimationContent = styled.div`
  ${() => css``}
`;

export const Icon = styled.img`
  ${() => css`
    padding: 20%;
    width: 100%;
  `}
`;

export const IconDescription = styled.p`
  ${({ theme }) => css`
    color: #82aabe;
    font-weight: ${theme.font.bold};
    font-size: 12px;
    padding-top: 4px;
    text-align: center;
  `}
`;

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: 14px;
    text-align: center;
  `}
`;

export const ProgressBar = styled.div`
  ${() => css`
    border: 2px solid #d9e5eb;
    margin-bottom: 13%;
    border-radius: 16px;
  `}
`;

export const ProgressImg = styled.img`
  ${() => css`
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
  `}
`;
