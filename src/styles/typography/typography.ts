import { css } from "styled-components";
import GambarinoRegularTtf from "../../assets/fonts/Gambarino-Regular.ttf";
import GambarinoRegularWoff from "../../assets/fonts/Gambarino-Regular.woff";
import GambarinoRegularWoff2 from "../../assets/fonts/Gambarino-Regular.woff2";
import {
  defaultBodyMdSemibold,
  defaultBodyXsSemibold,
  defaultHeadingLg,
  defaultBodySmRegular,
  defaultBodyXsRegular,
  defaultBodySmSemibold,
  defaultHeadingXs,
  defaultHeadingXxs,
  defaultBodyMdBold,
} from "./default";

export const typography = css`
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
      ${defaultHeadingLg}
    }

    h2 {
      ${defaultHeadingXs}
    }

    h3 {
      ${defaultHeadingXxs}

      span {
        ${defaultBodyMdBold}
      }
    }

    h4 {
      ${defaultBodyMdBold}
    }

    h5 {
      ${defaultBodySmSemibold}
    }

    h6 {
      ${defaultBodyXsSemibold}
    }

    p {
      ${defaultBodySmRegular}
    }

    span {
      ${defaultBodySmRegular}
    }

    button {
      ${defaultBodyMdSemibold}
    }

    label {
      ${defaultBodySmRegular}
    }

    input {
      ${defaultBodySmRegular}
    }

    a {
      ${defaultBodyXsRegular}
    }
  }
`;
