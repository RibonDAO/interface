import { css } from "styled-components";
import GambarinoRegularTtf from "../assets/fonts/Gambarino-Regular.ttf";
import GambarinoRegularWoff from "../assets/fonts/Gambarino-Regular.woff";
import GambarinoRegularWoff2 from "../assets/fonts/Gambarino-Regular.woff2";

const typography = css`
  body {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    @font-face {
      font-family: "Gambarino-Regular";
      src: url(${GambarinoRegularTtf}) format("truetype"),
        url(${GambarinoRegularWoff}) format("woff"),
        url(${GambarinoRegularWoff2}) format("woff2");

      font-weight: 400;
      font-display: swap;
      font-style: normal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    span {
      color: ${({ theme }) => theme.colors.darkGray};
    }

    h1 {
      font-size: 36px;
      line-height: 1.6;
      font-weight: 700;
    }

    h2 {
      font-size: 24px;
      line-height: 1.7;
      font-weight: 700;
    }

    h3 {
      font-size: 20px;
      line-height: 1.7;
      font-weight: 700;

      span {
        font-size: 16px;
      }
    }

    h4 {
      font-size: 16px;
      line-height: 1.7;
      font-weight: 700;
    }

    h5 {
      font-size: 14px;
      line-height: 1.7;
      font-weight: 600;
    }

    h6 {
      font-size: 12px;
      line-height: 1.7;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      line-height: 1.7;
      font-weight: 400;
    }

    button {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 600;
    }

    label {
      font-size: 14px;
      line-height: 1.7;
      font-weight: 400;
    }

    input {
      font-size: 14px;
      line-height: 1.7;
      font-weight: 400;
    }

    a {
      font-size: 12px;
      line-height: 1.7;
      font-weight: 400;
    }
  }
`;

export default typography;
