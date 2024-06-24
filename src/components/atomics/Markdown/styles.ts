import styled from "styled-components";
import { defaultBodyLgBold, defaultBodySmSemibold } from "styles/typography/default";

export const MarkdownContainer = styled.div`
  width: 100%;
  padding: 48px 24px;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    ${defaultBodyLgBold}
  }

  h3 {
    ${defaultBodySmSemibold}
  }

  p {
    line-height: 24px;
  }

  ul {
    margin-top: -12px;
    padding-left: 24px;
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

  table {
    width: 100%;
  }

  th,
  td {
    padding: ${({ theme }) => theme.spacing(4)};;
    font-weight: 400;
    text-align: start;
  }
`;
