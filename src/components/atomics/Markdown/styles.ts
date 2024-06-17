import styled from "styled-components";

export const MarkdownContainer = styled.div`
  width: 100%;
  padding: 48px 24px;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ul {
    margin-top: -12px;
    padding-left: 24px;
    line-height: 24px;
  }

  p {
    line-height: 24px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  th,
  tr,
  td,
  table {
    margin-bottom: 12px;
  }

  th,
  td {
    padding: 8px;

    border: 1px solid #000;
  }
`;
