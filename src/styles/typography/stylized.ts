import { css } from "styled-components";

/* Gambarino */

const gambarino = css`
  font-family: "Gambarino-Regular";
`;

const stylizedDisplay = css`
  ${gambarino}
  font-weight: 400;
`;

export const stylizedDisplayLarge = css`
  ${stylizedDisplay}
  font-size: 56px;
  line-height: 96px;
`;

export const stylizedDisplayMedium = css`
  ${stylizedDisplay}
  font-size: 48px;
  line-height: 80px;
`;

export const stylizedDisplaySmall = css`
  ${stylizedDisplay}
  font-size: 40px;
  line-height: 68px;
`;

const stylizedHeading = css`
  ${gambarino}
  font-weight: 400;
`;
export const stylizedHeadingLarge = css`
  ${stylizedHeading}
  font-size: 36px;
  line-height: 70px;
`;

export const stylizedHeadingMedium = css`
  ${stylizedHeading}
  font-size: 32px;
  line-height: 56px;
`;

export const stylizedHeadingSmall = css`
  ${stylizedHeading}
  font-size: 28px;
  line-height: 48px;
`;

const stylizedTitle = css`
  ${gambarino}
  font-weight: 400;
`;
export const stylizedTitleLarge = css`
  ${stylizedTitle}
  font-size: 24px;
  line-height: 40px;
`;

export const stylizedTitleMedium = css`
  ${stylizedTitle}
  font-size: 20px;
  line-height: 36px;
`;
