import { createGlobalStyle, css } from "styled-components";
import normalize from "./normalize";
import typography from "./typography";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${typography}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    :focus {
      outline: none;
    }
  }

  ${({ theme }) => css`
    html,
    body,
    #root {
      min-height: 100vh;
      background: ${theme.colors.white};
    }

    body {
      font-family: ${theme.font};
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
