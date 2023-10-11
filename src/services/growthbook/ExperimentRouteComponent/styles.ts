import styled from "styled-components";

export const Iframe = styled.iframe`
  width: 100%;
  min-height: 100vh;
  margin-bottom: -100px;
  border: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
