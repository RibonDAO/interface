import { createGlobalStyle, css } from "styled-components";
import normalize from "./normalize";
import { typography } from "./typography/typography";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${typography}

  * {
    margin: ${({ theme }) => theme.spacing(0)};
    padding: ${({ theme }) => theme.spacing(0)};
    box-sizing: border-box;
    :focus {
      outline: none;
    }
  }

  ${({ theme }) => css`
    html,
    body,
    #root {
      min-height: ${window.innerHeight}px;
      background: ${theme.colors.neutral10};
    }

    #root {
      display: block;
    }

    #launcher {
      display: none !important;
    }
  `}
  
  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
