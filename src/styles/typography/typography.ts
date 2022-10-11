import { css } from "styled-components";
import GambarinoRegularTtf from "../../assets/fonts/Gambarino-Regular.ttf";
import GambarinoRegularWoff from "../../assets/fonts/Gambarino-Regular.woff";
import GambarinoRegularWoff2 from "../../assets/fonts/Gambarino-Regular.woff2";
import {
  defaultComponentTextLarge,
  defaultComponentTextSmall,
  defaultHeadingLarge,
  defaultParagraphMedium,
  defaultParagraphSmall,
  defaultSubtitleMedium,
  defaultTitleLarge,
  defaultTitleMedium,
  defaultTitleSmall,
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
      ${defaultHeadingLarge}
    }

    h2 {
      ${defaultTitleLarge}
    }

    h3 {
      ${defaultTitleMedium}

      span {
        ${defaultTitleSmall}
      }
    }

    h4 {
      ${defaultTitleSmall}
    }

    h5 {
      ${defaultSubtitleMedium}
    }

    h6 {
      ${defaultComponentTextSmall}
    }

    p {
      ${defaultParagraphMedium}
    }

    span {
      ${defaultParagraphMedium}
    }

    button {
      ${defaultComponentTextLarge}
    }

    label {
      ${defaultParagraphMedium}
    }

    input {
      ${defaultParagraphMedium}
    }

    a {
      ${defaultParagraphSmall}
    }
  }
`;
